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
// 更新月数下拉菜单
function init_month(now_month) {
    $("yl_month button").text(now_month[0] + "年" + now_month[1] + "月")
    now_month[1] += 1
    for (let i = 0; i < 5; i++) {
        now_month[1] -= 1
        yl_month_li += "<li><a href=\"#\">" + now_month + "</a></li>"
    }
    $("yl_month ul").append(yl_month_li)
}
// 更新油料情况列表
function init_yl_list() {

}
// 删除数据
$("#yl_list tbody tr td button").click(function () {
    action = "del"
    states = 1
    $.ajax({
        type: "get",
        url: "../src/yltj.php",
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
        url: "../src/yltj.php",
        data: {
            'action': action,
            'states': states
        },
        success: function (request) {
            init_month(request["month"])
            init_car_card(request["init_cc"])
            init_jy_card(request["init_jc"])
            init_yl_list(request["yl_search"])
        }
    })
})

// 检查加油次数必须大于0

// 检查金额和消耗是否为小数2位
// 增加数据
// 查询现在月数
// 查询所选月数的加油信息
// 添加数据查询的求和