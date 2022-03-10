import { serve } from "https://deno.land/std@0.127.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.127.0/http/file_server.ts";
import { format } from "https://deno.land/std@0.127.0/datetime/mod.ts";

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
                    return createJsonResponse({disaster:"大雪",
                    mesasureItem:[{name:"ツルハシ",link:""},{name:"冬タイヤに変更",link:""},{name:"水",link:"https://www.amazon.co.jp/s?k=水"},
                    {name:"食料",link:"https://www.amazon.co.jp/s?k=備蓄食料"},{name:"灯油",link:""},
                    {name:"使い捨てカイロ",link:"https://www.amazon.co.jp/s?k=使い捨てカイロ"},{name:"予備電池",link:"https://www.amazon.co.jp/s?k=予備電池"},
                    {name:"懐中電灯",link:"https://www.amazon.co.jp/s?k=懐中電灯"},{name:"携帯ラジオ",link:"https://www.amazon.co.jp/s?k=携帯ラジオ"}]});
                }
                else if(state=="沖縄県") {
                    return createJsonResponse({disaster:"台風",
                    mesasureItem:[{"新聞紙を窓のサッシに詰める":""},{name:"植木鉢をしまう",link:""},{name:"水",link:"https://www.amazon.co.jp/s?k=水"},
                    {name:"食料",link:"https://www.amazon.co.jp/s?k=備蓄食料"},{name:"養生テープ",link:"https://www.amazon.co.jp/s?k=養生テープ"},
                    {name:"予備電池",link:"https://www.amazon.co.jp/s?k=予備電池"},{name:"懐中電灯",link:"https://www.amazon.co.jp/s?k=懐中電灯"},
                    {name:"携帯ラジオ",link:"https://www.amazon.co.jp/s?k=携帯ラジオ"}]});
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