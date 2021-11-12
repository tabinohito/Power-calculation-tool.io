var json =[     //jsonサンプルデータ

]
var sub_flag = false;

// table要素を生成
var input_table = document.createElement('table');
input_table.classList.add("input");
// table要素を生成
var table = document.createElement('table');
input_table.classList.add("main");
// table要素を生成
var sub_table = document.createElement('table');
input_table.classList.add("sub");

window.onload = function(){
    //inputテーブル
    var TR_Menue = [document.createElement('tr'),
                    document.createElement('tr'),
                    document.createElement('tr'),
                    document.createElement('tr'),
                    document.createElement('tr'),
                    document.createElement('tr')
    ]
    TR_Menue[0].appendChild(add_value_th("電源電圧 [V]","input"));
    TR_Menue[0].appendChild(add_textbox("voltage","txt"));
    TR_Menue[1].appendChild(add_value_th("動作時消費電流 [mA]","input"));
    TR_Menue[1].appendChild(add_textbox("motion_current","txt"));
    TR_Menue[2].appendChild(add_value_th("静止時消費電力 [mA]","input"));
    TR_Menue[2].appendChild(add_textbox("sleep_current","txt")); 
    TR_Menue[3].appendChild(add_value_th("動作回数/分 [回]","input"));
    TR_Menue[3].appendChild(add_textbox("count","txt"));
    TR_Menue[4].appendChild(add_value_th("動作時間/回 [sec]","input"));
    TR_Menue[4].appendChild(add_textbox("time","txt"));
    var TD_add = document.createElement('td');
    TD_add.appendChild(add_button("add_sensor","計算","add_();","button"));
    TR_Menue[5].appendChild(TD_add);
    var TD_clear = document.createElement('td');
    TD_clear.appendChild(add_button("clear","消去","remove_();","button"));
    TR_Menue[5].appendChild(TD_clear);

    for(var i = 0;i < TR_Menue.length;i++){
        input_table.appendChild(TR_Menue[i]);
    }
    // 生成したtable要素を追加する
    document.getElementById("inputtable").appendChild(input_table);

    //mainテーブル
    var TR_CHECK = document.createElement('tr');
    var th_SELECT = add_value_th("SELECT","main");
    th_SELECT.setAttribute("colspan", "3")
    TR_CHECK.appendChild(th_SELECT);
    table.appendChild(TR_CHECK);

    var TR_FIRST_COL = document.createElement('tr');
    TR_FIRST_COL.appendChild(add_value_th("電源電圧 [V]","main"));
    TR_FIRST_COL.appendChild(add_value_th("動作時消費電流 [mA]","main"));
    TR_FIRST_COL.appendChild(add_value_th("静止時消費電流 [mA]","main"));
    table.appendChild(TR_FIRST_COL);

    var TR_SECOND_COL = document.createElement('tr');
    TR_SECOND_COL.appendChild(add_value_th("動作回数/分 [回]","main"));
    TR_SECOND_COL.appendChild(add_value_th("動作時間/回 [sec]","main"));
    TR_SECOND_COL.appendChild(add_value_th("平均消費電力 [mW]","main"));
    table.appendChild(TR_SECOND_COL);

    // 生成したtable要素を追加する
    document.getElementById("maintable").appendChild(table);

    //subテーブル
    var TR_SUM = document.createElement('tr');
    var th_SUM = add_value_th("合計平均消費電力 [mW]");
    // th_SUM.setAttribute("colspan", "3")
    TR_SUM.appendChild(th_SUM);
    sub_table.appendChild(TR_SUM);
    // 生成したtable要素を追加する
    document.getElementById("subtable").appendChild(sub_table);
}

function add_(){
    if(is_fill_textbox("voltage") && is_fill_textbox("motion_current") && is_fill_textbox("sleep_current") && is_fill_textbox("count")  && is_fill_textbox("time")){
        var obj = {"view":true,
                "電源電圧":document.getElementById("voltage").value ,
                "動作時消費電流":document.getElementById("motion_current").value , 
                "静止時消費電流":document.getElementById("sleep_current").value ,
                "動作回数/分":document.getElementById("count").value , 
                "動作時間/回":document.getElementById("time").value
                };
        var buf = new data(obj);
        obj["平均消費電力"] = buf.ElectoricPower();
        json.push(obj);
        add_table(json);
        clear("voltage");clear("motion_current");clear("sleep_current");clear("count");clear("time");
    }
    else{
        alert("未入力項目があります");
    }
};

function remove_(){
    const remove_flag = document.getElementsByName("remove_flag");
    let table_counter = 0;
    for(let i = 0;i < json.length;i++){
        if(json[i].view){
            if(remove_flag[table_counter].checked){
                console.log(table_counter);
                json[i].view = false;
            }
            table_counter++;
        }
    }

    for(let i = 0,j = 0;i < json.length;i++){
        //１つの情報に付き3行で表示しているのでひとまとまりでさようなら～
        if(!json[i].view){
            if(remove_flag[j] != null){
                if(remove_flag[j].checked){
                    for(let k = 1;k <= 3;k++){
                        table.deleteRow((j+1) * 3);
                    }
                }
            }
        }else{
            j++;
        }
    }

    if(sub_flag){
        //subテーブル
        var TR_SUM = document.createElement('tr');
        var TD_SUM = document.createElement('td');
        sub_table.deleteRow(-1);
        TD_SUM.classList.add("sub");
        var SUM_PWR = 0;
        for(let i = 0;i < json.length;i++){
            if(json[i]["view"]){
                SUM_PWR = SUM_PWR + json[i]["平均消費電力"];
            }
        }
        TD_SUM.textContent = SUM_PWR;
        TR_SUM.appendChild(TD_SUM);
        sub_table.appendChild(TR_SUM);
        // 生成したtable要素を追加する
        document.getElementById("subtable").appendChild(sub_table);
    }    

};

function add_table(obj,class_name){
    var TR_CHECK = document.createElement('tr');
    
    //チェックボックスを追加
    TR_CHECK.appendChild(add_checkbox("remove_flag","main"));
    table.appendChild(TR_CHECK);

    //テーブル本体を追加
    var TR_FIRST_COL = document.createElement('tr');
    TR_FIRST_COL.appendChild(add_value_td(this.obj,"電源電圧","main"));
    TR_FIRST_COL.appendChild(add_value_td(this.obj,"動作時消費電流","main"));
    TR_FIRST_COL.appendChild(add_value_td(this.obj,"静止時消費電流","main"));
    table.appendChild(TR_FIRST_COL);

    var TR_SECOND_COL = document.createElement('tr');
    TR_SECOND_COL.appendChild(add_value_td(this.obj,"動作回数/分","main"));
    TR_SECOND_COL.appendChild(add_value_td(this.obj,"動作時間/回","main"));
    TR_SECOND_COL.appendChild(add_value_td(this.obj,"平均消費電力","main"));
    table.appendChild(TR_SECOND_COL);

    document.getElementById("maintable").appendChild(table);

    //subテーブル
    var TR_SUM = document.createElement('tr');
    var TD_SUM = document.createElement('td');
    if(sub_flag){
        sub_table.deleteRow(-1);
    }
    sub_flag = true;          
    TD_SUM.classList.add("sub");
    var SUM_PWR = 0;
    for(let i = 0;i < obj.length;i++){
    if(obj[i]["view"]){
        SUM_PWR = SUM_PWR + obj[i]["平均消費電力"];
        console.log(i);
    }
    }
    console.log(SUM_PWR);
    TD_SUM.textContent = SUM_PWR;
    TR_SUM.appendChild(TD_SUM);
    sub_table.appendChild(TR_SUM);
    // 生成したtable要素を追加する
    document.getElementById("subtable").appendChild(sub_table);
}

function add_checkbox(name,class_name){        
    var check = document.createElement('input');
    check.classList.add(class_name);
    check.setAttribute('type','checkbox');
    check.setAttribute('name',name);
    check.setAttribute("colspan", "3");
    return check;
}

function add_textbox(id,class_name){        
    var text = document.createElement('input');
    text.setAttribute('type','number');
    text.setAttribute('id',id);
    text.classList.add(class_name);
    return text;
}

function add_button(id,value,onclick,class_name){        
    var button = document.createElement('input');
    button.classList.add(class_name);
    button.setAttribute('type','button');
    button.setAttribute('id',id);
    button.setAttribute('value',value);
    button.setAttribute('onclick',onclick);
    
    return button;
}

function add_value_th(text,class_name){
    var th_value = document.createElement('th');
    th_value.classList.add(class_name);
    th_value.textContent = text;
    return th_value;
}

function add_value_td(json,name,class_name){
    var td_value = document.createElement('td');
    td_value.classList.add(class_name);
    td_value.textContent = this.json[this.json.length - 1][name];
    return td_value;
}

function isEmpty(obj){
    return !Object.keys(obj).length;
}

function is_fill_textbox(id){
    if(document.getElementById(id).value == '') {
        return false; 
    }
    return true;
};

function clear(id){
    document.getElementById(id).value = '';
};

class data{
    constructor(obj){
        this.voltage = obj["電源電圧"];           
        this.motion_current = obj["動作時消費電流"] / 1000; //mA -> A
        this.sleep_current = obj["静止時消費電流"] / 1000; //mA -> A
        this.count = obj["動作回数/分"];//1秒あたりの動作回数
        this.time = obj["動作時間/回"] / 1000; //msec -> sec
        this.motion_time = (this.time * this.count);//動作時間
        this.sleep_time =  60 - (this.time * this.count);//静止時間
    };

    ElectoricPower_motion(){ return this.voltage * this.motion_current; };
    ElectoricPower_all_motion(){ return this.ElectoricPower_motion() * this.motion_time; };
    ElectoricPowerHour_motion(){ return this.ElectoricPower_all_motion() / 60; };

    ElectoricPower_sleep(){ return this.voltage * this.sleep_current; };
    ElectoricPower_all_sleep(){ return this.ElectoricPower_sleep() * this.sleep_time; };
    ElectoricPowerHour_sleep(){ return this.ElectoricPower_all_sleep() / 60; };

    ElectoricPower(){  return ((this.ElectoricPower_all_motion() + this.ElectoricPower_all_sleep()) / 60); };
};