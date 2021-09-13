# Power-calculation-tool.io
## About
電力計算ツールたち

## Menu
- センサー電力計算ツール ***簡易版*** <br>
3台のセンサーの各平均消費電力、及び平均消費電力の合計が計算できるツール
https://tabinohito.github.io/Power-calculation-tool.io/calc_power-consumption.html

- センサー電力計算ツール<br>
任意の数のセンサーの各平均消費、及び平均消費電力の合計が計算できるツール  
　![PC版](https://tabinohito.github.io/Power-calculation-tool.io/calc_sensor_power-consumption.html)
　![スマートフォン版](https://tabinohito.github.io/Power-calculation-tool.io/calc_sensor_power-consumption_sp.html)
## Usage
### センサー電力計算ツール ***簡易版*** <br>
以下に示す写真のように、初期値としてデータが入力されている
![easy-tool](https://github.com/tabinohito/Power-calculation-tool.io/blob/images/images/easy-tool-menu.jpg)

#### 各項目の説明 <br>
- 電源電圧 **[V]**<br>
センサーのに与える電源の電圧
- 動作時消費電力 **[mA]**<br>
センサーが動作するタイミングでのセンサーが消費する電流
- 動作回数/分 **[回]**<br>
1分間にセンサーが何回動作するか <br>
連続して動作する場合は、1となる <br>
- 動作時間/回　**[milli sec]**<br>
1度センサーが動作したときに、動作が継続する時間 <br>
連続して動作する場合は、60000となる <br>

各センサのデータを入力後、********計算******** ボタンを押す <br>
<br>
pwr_1 → <br>
pwr_num_1 → <br>
pwr_sum_1 → <br>
res_4 → <br>
<br>
の項目に計算結果が反映される

### センサー電力計算ツール <br>
以下に示す写真のように、初期値としてデータが入力されている
![tool](https://github.com/tabinohito/Power-calculation-tool.io/blob/images/images/tool-menu.jpg)

#### 各項目の説明 <br>
- 電源電圧 **[V]**<br>
センサーのに与える電源の電圧
- 動作時消費電流 **[mA]**<br>
センサーが動作するタイミングでのセンサーが消費する電流
- 静止時消費電流 **[mA]**<br>
センサーが静止しているタイミングでのセンサーが消費する電流
- 動作回数/分 **[回]**<br>
1分間にセンサーが何回動作するか <br>
連続して動作する場合は、1となる <br>
- 動作時間/回　**[milli sec]**<br>
1度センサーが動作したときに、動作が継続する時間 <br>
連続して動作する場合は、60000となる <br>
- 計算
各項目への入力が完了した後、このボタンを押すことで計算結果を反映できる <br>
反映後は以下のようになる <br>
![入力後](https://github.com/tabinohito/Power-calculation-tool.io/blob/images/images/入力後.jpg)
- 消去
以下のように、データを選択し、削除ボタンを押す
![選択後](https://github.com/tabinohito/Power-calculation-tool.io/blob/images/images/選択済み.jpg)

- csvファイルダウンロード　<br>
記入済みのデータをcsv形式でダウンロードする <br>
その際、横のテキストボックスでファイル名を指定できる <br>
