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
// 车辆牌照下拉菜单选择
$("#car_card").find("li").click(function () {
    $("#car_card").find("input").val($(this).find("a").text())
})

// 加油次数必须大于0
// 加油方式下拉菜单选择
// 添加数据到加油卡号下拉菜单
// 加油卡号下拉菜单选择
// 检查金额和消耗是否为小数2位
// 增加数据
// 查询现在月数
// 查询所选月数的加油信息

// 初始化
// $(document).ready(function () {
//     $.ajax({
//         type: "get",
//         url: "../src/yltj.php",
//         data: "action='get_init'",
//         success: function (response) {

//         }
//     })
// })
