# 小小益智樂園 🧩

兒童益智遊戲合輯，單一 PWA：首頁是遊戲大廳，點進去玩各個遊戲，每個遊戲裡都有 🏠 回大廳。

| 資料夾 | 遊戲 | 來源 repo |
|---|---|---|
| `zoo/` | 🦊 動物遊樂園（記憶配對、數字、形狀顏色、拼圖、節奏、迷宮） | kftseng2oo1/Tonone |
| `sound/` | 🐾 世界動物叫聲遊戲 | kftseng2oo1/animal-sound |
| `number/` | 🔢 數字小天才（1–10、國字、英文、測驗、加減、記憶） | kftseng2oo1/number |
| `warmmy/` | 🐣 小暖滑滑樂（滑雪、漂流、賽車…） | kftseng2oo1/warmmy |

網址：https://kftseng2oo1.github.io/kids/

## 整合時對各遊戲做的修改
- manifest 改指向根目錄的 `manifest.json`（整個樂園一個圖示、一個 App）
- Service Worker 統一用根目錄 `sw.js`（scope 涵蓋所有子資料夾，玩過一次即可離線）
- 加上 🏠 回大廳按鈕；小暖滑滑樂原本的「回暖心時鐘」改成「回遊戲大廳」
- 遊戲本身邏輯沒動。原 repo 不受影響，之後原 repo 有更新，重新複製 `index.html` 再套用以上修改即可

進度存在 localStorage，和原本 kftseng2oo1.github.io 上的同名遊戲共用（同網域），所以星星、關卡紀錄會延續。
