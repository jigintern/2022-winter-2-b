import { fetchJSON, fetchText } from "./fetch.js";

timeButton.onclick = async () => {
  // 現在の日時を返す API にアクセスする
  // サーバからのレスポンスはただのテキスト形式
  const data = await fetchText("/api/time");
  console.log(data);

  // アラートで表示
  alert(data);
};

asmdButton.onclick = async () => {
  // 四則演算の API にアクセスする
  // クエリパラメータで使ってパラメータを送る
  // サーバからのレスポンスは JSON 形式
  const url = `/api/asmd?x=${xNumber.value}&y=${yNumber.value}`;
  const data = await fetchJSON(url);
  console.log(data);

  // 計算結果の JSON を DOM 操作して画面に表示する
  const x = data.x;
  const y = data.y;
  asmdResult.innerText = `${x} + ${y} = ${data.addition}
        ${x} - ${y} = ${data.subtraction}
        ${x} * ${y} = ${data.multiplication}
        ${x} / ${y} = ${data.division}`;
};

reverseButton.onclick = async () => {
  // 文字列を反転する API にアクセスする
  // JSON 形式のパラメータを送る
  // サーバからのレスポンスも JSON 形式
  const data = await fetchJSON("/api/reverse", {
    message: reverseInput.value,
  });
  console.log(data);

  // 反転した文字列でテキストボックスを書き換える
  reverseInput.value = data.message;
};
