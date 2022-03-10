import { serve } from "https://deno.land/std@0.127.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.127.0/http/file_server.ts";
import { format } from "https://deno.land/std@0.127.0/datetime/mod.ts";
// import { Push } from "https://github.com/taisukef/webpush";
import * as postgres from "https://deno.land/x/postgres@v0.14.2/mod.ts";

var el = document.createElement("script");
el.src = "https://github.com/taisukef/webpush";
document.body.appendChild(el);

// var typhoonFlag = true;
// var heavysnowFlag = false;

// Push.Permission.request();
// const today = new Date();
// const month = today.getMonth();
// var dummymonth = 10;

const pool = new postgres.Pool("postgres://postgres:g@YuSHnBpnZW2EM@db.owqjksavimjrdyrclnld.supabase.co:6543/postgres", 3, true);


console.log("Listening on http://localhost:8000");
serve((req) => {
    const url = new URL(req.url);
    const pathname = url.pathname;
    const state = url.searchParams.get('p');
    console.log("state:" + state);
    console.log("Request:", req.method, pathname);
    

    // /api/ で始まる場合、API サーバっぽく処理して返す
    if (pathname.startsWith("/api/")) {
        switch (pathname) {
            case "/api/prefectures":

                if(state=="北海道") {
                    const connection = pool.connect();
                    const result = connection.queryObject`
                        SELECT * FROM DisasterPrevention
                    `;
                    const body = JSON.stringify(result.rows, null, 2);
                    return new Response(body, {
                        headers: { "content-type": "application/json" },
                    });
                }
                else if(state=="沖縄県") {
                    const connection = pool.connect();
                    const result = connection.queryObject`
                        SELECT * FROM todos
                    `;
                    const body = JSON.stringify(result.rows, null, 2);
                    return new Response(body, {
                        headers: { "content-type": "application/json" },
                    });
                }
                else {
                    return createJsonResponse(["北海道", "沖縄"]);
                }
            
            case "/api/time":
                return apiTime(req);
            case "api/asmd":
                return apiFourArithmeticOperations(req);
        }
    }

    // switch (dummymonth) {
    //     case 10:
    //         if(heavysnowFlag==true){
    //         Push.create('大雪の季節です!',{
    //             body:'チェックリストを確認しましょう!',
    //             timeout:8000
    //         })}
    //         heavysnowFlag = false;
    //         typhoonFlag = true;
    //     case 5:
    //         if(typhoonFlag==true){
    //         Push.create('台風の季節です!',{
    //             body:'チェックリストを確認しましょう!',
    //             timeout:8000
    //         })}
    //         typhoonFlag = false;
    //         heavysnowFlag = true;
    // }

    // pathname に対応する static フォルダのファイルを返す（いわゆるファイルサーバ機能）
    // / → static/index.html
    // /hoge → static/hoge/index.html
    // /fuga.html → static/fuga.html
    // /img/piyo.jpg → static/img/piyo.jpg
    return serveDir(req, {
        fsRoot: "static",
        urlRoot: "",
        showDirListing: true,
        enableCors: true
    });
});

// 従来の function を使った関数宣言
// 現在の日時を返す API
function apiTime(req: Request) {
    return new Response(format(new Date(), "yyyy-MM-dd HH:mm:ss"));
}

// アロー関数を使った関数宣言
// クエリパラメータの x と y の四則演算の結果を JSON で返す API
const apiFourArithmeticOperations = (req: Request) => {
    const params = parseSearchParams(new URL(req.url));
    const x = params.x;
    const y = params.y;

    let addition = 0;
    let subtraction = 0;
    let multiplication = 0;
    let division = 0;
    if (typeof x === "number" && typeof y === "number") {
        addition = x + y;
        subtraction = x - y;
        multiplication = x * y;
        division = x / y;
    }
    return createJsonResponse({ x, y, addition, subtraction, multiplication, division });
}

// URL のクエリパラメータをパースする
const parseSearchParams = (url: URL) => {
    const params: Record<string, string | number | boolean> = {};
    for (const p of url.searchParams) {
        const n = p[0], v = p[1];
        if (v === "")
            params[n] = true;
        else if (v === "true")
            params[n] = true;
        else if (v === "false")
            params[n] = false;
        else if (!isNaN(Number(v)))
            params[n] = +v;
        else
            params[n] = v;
    }
    return params;
};

// JSON のレスポンスを生成する
const createJsonResponse = (obj: any) => new Response(JSON.stringify(obj), {
    headers: {
        "content-type": "application/json; charset=utf-8"
    }
});

// クライアントから送られてきた JSON の message の文字列を反転して返す API
// curl -X POST -d '{ "message": "hello" }' http://localhost:8000/api/reverse
// → {"message":"olleh"}
const apiReverse = async (req: Request) => {
    const json = (await req.json()) as ApiReversePayload;
    const message = json.message;
    const reversedMessage = message.split("").reverse().join("");
    return createJsonResponse({ message: reversedMessage });
};

type ApiReversePayload = {
    message: string;
};

const encoder = new TextEncoder();

const mailAdressFile = encoder.encode("data");

