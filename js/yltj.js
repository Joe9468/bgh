var data = {}
var action = null
var states = 0

// 车辆牌照下拉菜单选择
$("#car_card ul li a ").click(function () {
    $("#car_card input").val($(this).text())
})
// 加油方式下拉菜单选择
$("#jy_type ul li a").click(function () {
    $("#jy_type input").val($(this).text())
    if ($(this).text() == "实物油") {
        $("#jy_card, #jy_card_je").addClass("hidden")
        $("#jy_sw").removeClass("hidden")
    } else if ($(this).text() == "加油卡") {
        $("#jy_card, #jy_card_je").removeClass("hidden")
        $("#jy_sw").addClass("hidden")
    }
})
// 加油卡号下拉菜单选择
$("#jy_card ul li a").click(function () {
    $("#jy_card input").val($(this).text())
})
// 添加数据到车辆牌照下拉菜单
function init_car_card(cc_arr) {
    $.each(cc_arr, function (i) {
        li_html = "<li><a href=\"#\">" + cc_arr[i] + "</a></li>"
        if (i == 0) {
            $("#car_card").find("input").val(cc_arr[i])
        }
        $("#car_card").find("ul").append(li_html)
    })
}
// 添加数据到加油卡号下拉菜单
function init_jy_card(jc_arr) {
    $.each(jc_arr, function (i) {
        li_html = "<li><a href=\"#\">" + jy_arr[i] + "</a></li>"
        if (i == 0) {
            $("#jy_card").find("input").val(cc_arr[i])
        }
        $("#jy_card").find("ul").append(li_html)
    })
}

// Date组函数
function str_to_date(date_str) {
    date = date_str.split('-')
    date[0] = parseInt(date[0])
    date[1] = parseInt(date[1])
    return date
}

function addMonth(date, num) {
    num = parseInt(num)
    var eYear = date[0]
    var eMonth = date[1] + num
    while (eMonth > 12) {
        eYear++
        eMonth -= 12
    }
    while (eMonth < 1) {
        eYear--
        eMonth += 12
    }
    date[0] = eYear
    date[1] = eMonth
    return date
}

function date_format(date) {
    return date[0] + "年" + date[1] + "月"
}

function format_str(str) {
    return str.substring(0, 3) + '-' + str.substring(5, 6) + "-01 00:00:00"
}
// 初始化月数下拉菜单
function init_month(date_string) {
    date = str_to_date(date_string)
    addMonth(date, 1)
    action = "yl_list"
    states = 2
    $.ajax({
        type: "get",
        url: "/src/yltj.php",
        data: {
            'action': action,
            'states': states,
            'month': format_str(date)
        },
        success: function (request) {
            request = JSON.parse(request)
            data = JSON.parse(request['data'])
            $("yl_month button").text(date_format(date))
            addMonth(date, 1)
            for (let i = 0; i < 5; i++) {
                addMonth(date, -1)
                yl_month_li += "<li><a href=\"#\">" + date_format(date) + "</a></li>"
            }
            $("yl_month ul").append(yl_month_li)
            init_yl_list(data['yl_list'])
        }
    })
}
// 月数下拉菜单被点击
$("yl_month ul li a").click(function () {
    action = "yl_list"
    states = 2
    $.ajax({
        type: "get",
        url: "/src/yltj.php",
        data: {
            'action': action,
            'states': states,
            'month': format_str($(this).text())
        },
        success: function (request) {
            request = JSON.parse(request)
            data = JSON.parse(request['data'])
            $("yl_month button").text($(this).text())
            init_yl_list(data['yl_list'])
        }
    })
})
// 更新油料情况列表
function init_yl_list(yl_list) {
    $("#yl_list thead tbody").empty()
    var dw_name = ""
    var c_je = 0
    var swyl = 0
    $.each(yl_list, function (indexInArray, valueOfElement) {
        tbody_html = "<tr>"
        tbody_html += "<td style=\"text-align: center;\" class=\"hidden\">" + valueOfElement['ylid'] + "</td>"
        tbody_html += "<td style=\"text-align: center;\">" + valueOfElement['dw_name'] + "</td>"
        tbody_html += "<td style=\"text-align: center;\">" + valueOfElement['car_card'] + "</td>"
        tbody_html += "<td style=\"text-align: center;\">" + valueOfElement['times'] + "</td>"
        tbody_html += "<td style=\"text-align: center;\">" + valueOfElement['type'] + "</td>"
        tbody_html += "<td style=\"text-align: center;\">" + valueOfElement['jy_card'] + "</td>"
        tbody_html += "<td style=\"text-align: center;\">" + valueOfElement['c_je'] + "</td>"
        tbody_html += "<td style=\"text-align: center;\">" + valueOfElement['swyl'] + "</td>"
        if (valueOfElement['rz'] == 0) {
            tbody_html += "<td style=\"text-align: center;\"><button type=\"button\" class=\"btn btn-xs btn-danger\">删除</button></td>"
        } else {
            tbody_html += "<td style=\"text-align: center;\"><button type=\"button\" class=\"btn btn-xs btn-danger\" disable>删除</button></td>"
        }
        tbody_html += "</tr>"
        c_je += parseFloat(valueOfElement['c_je'])
        swyl += parseFloat(valueOfElement['swyl'])
        if (valueOfElement['dw_name'] != dw_name && dw_name != "") {
            tbody_html += "<tr>"
            tbody_html += "<td style=\"text-align: center;\"  colspan = \"6\">"+ valueOfElement['dw_name'] +"汇总</td>"
            tbody_html += "<td style=\"text-align: center;\">" + c_je + "</td>"
            tbody_html += "<td style=\"text-align: center;\">" + swyl + "</td>"
            tbody_html += "<td style=\"text-align: center;\"></td>"
            tbody_html += "</tr>"
            c_je = 0
            swyl = 0
        }
        dw_name = valueOfElement['dw_name']
        $("#yl_list thead tbody").append(tbody_html)
    })

}
// 删除数据
$("#yl_list tbody tr td button").click(function () {
    action = "del"
    states = 1
    $.ajax({
        type: "get",
        url: "src/yltj.php",
        data: {
            'action': action,
            'states': states,
            'ylid': $(this).parents("tr").children("td").first().text()
        },
        success: function (response) {
            $(this).parents("tr").remove()
        }
    })
})

$(document).ready(function () {
    action = "init"
    states = 0
    $.ajax({
        type: "get",
        url: "src/yltj.php",
        data: {
            'action': action,
            'states': states
        },
        success: function (request) {
            request = JSON.parse(request)
            data = JSON.parse(request['data'])
            init_month(data['month'])
            init_car_card(data['cc_arr'])
            init_jy_card(data['jc_arr'])
        }
    })
})

// 检查加油次数必须大于0

// 检查金额和消耗是否为小数2位
// 增加数据
// 查询现在月数
// 查询所选月数的加油信息
// 添加数据查询的求和