var user = null;
var user_url = {};

// 构建页面结构
function make_banner(user) {
    $("#my_tab").empty()
    if (user == null || user['power'] == 0) {
        console.log()
        $("#my_tab").append("<li class=\"hide\"><a href=\"#welcome\" data-toggle = \"tab\">欢迎</a></li>")
        $("#my_tab a:last").tab('show')
        return
    }
    $.getJSON(
        'data/power.json',
        function (result) {
            $.each(result, function (i, field) {
                var li_html = null
                if (field["children"] == null && (field["power"] & user["power"]) > 0) {
                    li_html = "<li><a href = \"#" + i + "\" data-toggle = \"tab\">" + field[
                        "xm_name"] + "</a></li>"
                    user_url[i] = field['url']
                } else if ((field["power"] & user["power"]) > 0) {
                    li_html =
                        "<li class=\"dropdown\"><a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=>" +
                        field["xm_name"] +
                        "<span class=\"caret\"></span></a><ul class=\"dropdown-menu\" role=\"menu\">"
                    var children_li = field["children"]
                    $.each(children_li, function (j, children_li_a) {
                        if ((children_li_a["power"] & user["power"]) > 0) {
                            li_html += "<li><a href = \"#" + j +
                                "\" data-toggle = \"tab\">" + children_li_a["xm_name"] +
                                "</a></li>"
                            user_url[j] = children_li_a['url']
                        }
                    })
                    li_html += "</ul>"
                }
                $("#my_tab").append(li_html)
            })
            $('#my_tab a:first').tab('show')
            // 让标题头可以点击
            $('#my_tab a').click(function (e) {
                e.preventDefault()
                $(this).tab('show')
            })
            $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                // 这里有个同步警号，没看懂，没理解，他和上面的$(this).tab('show)好像有冲突
                $($(e.target).attr('href')).load(user_url[$(e.target).attr("href").substring(1)])
                $($(e.relatedTarget).attr("href")).html("")
            })
        })
}


// 检查是否登录
$(document).ready(function () {
    $.ajax({
        'type': 'GET',
        'url': 'src/login.php',
        'data': {
            'action': 'is_login'
        },
        'success': function (data) {
            request = JSON.parse(data)
            if (request['states'] == 5) {
                user = JSON.parse(request['data'])
                $('#login a').text(user['username'])
                $('#change_ps').show()
            }
            make_banner(user)
        }
    })
})

// 恢复box中的设置
$('#username, #password').change(function () {
    $(this).removeClass('alert-danger')
    $(('.alert.alert-danger')).hide()
})

// 显示login登录框
$('#login').click(function () {
    if ($(this).text() == '登录') {
        $('#username').val('').removeClass('alert-danger')
        $('password').val('').removeClass('alert-danger')
        $('#login_box .alert').hide()
        $('#login_box').modal('show')
    }
})

// 点击登录
$('#login_box button').last().click(function () {
    $.ajax({
        'url': 'src/login.php',
        'type': 'POST',
        'data': {
            'action': 'login',
            'username': $('#username').val(),
            'password': hex_md5($('#password').val()),
            'remember': $(':checkbox:checked').val() ? "remember" : "n"
        },
        'success': function (data) {
            request = JSON.parse(data)
            switch (request['states']) {
                case 4:
                    $('#username').addClass('alert-danger').val('')
                    $('#password').val('')
                    $('#login_box .alert').show().text("没有这个用户")
                    break
                case 3:
                    $('#username').addClass('alert-danger').val('')
                    $('#password').val('')
                    $('#login_box .alert').show().text("用户被锁定，请联系管理员: 18304900713")
                    break
                case 2:
                    $('#password').addClass('alert-danger').val('')
                    $('#username').val('')
                    $('#login_box .alert').show().text("密码不正确，连续三次错误用户将被锁定")
                    break
                case 1:
                    user = JSON.parse(request['data'])
                    $('#login a').text(user['username'])
                    $('#change_ps').show()
                    make_banner(user)
                    $('#login_box').modal('hide')
            }
        }
    })
})

// 显示修改密码框
$('#change_ps').click(function () {
    $('#now_password').val('').removeClass('alert-danger')
    $('#new_password').val('').removeClass('alert-danger')
    $('#re_new_password').val('').removeClass('alert-danger')
    $('#change_ps_box .alert').hide()
    $('#change_ps_box button').disabled = true
    $('#change_ps_box').modal('show')
})

// 检查修改密码框
$('#now_password, #re_new_password, #new_password').change(function () {
    if (hex_md5($('#now_password').val()) != user['password']) {
        $('#now_password').addClass("alert-danger")
        $('#change_ps_box .alert').first().show()
        return
    }
    $('#now_password').removeClass("alert-danger")
    $('#change_ps_box .alert').first().hide()
    if ($("#new_password").val() != $('#re_new_password').val()) {
        $('#re_new_password').addClass("alert-danger")
        $('#change_ps_box .alert').last().show().text("密码不一致")
        return
    }
    $('#re_new_password').removeClass("alert-danger")
    $('#change_ps_box .alert').last().hide()
    if ($("#new_password").val() == "") {
        $('#new_password').addClass("alert-danger")
        $('#change_ps_box .alert').last().show().text("密码不能为空")
        return
    }
    $('#new_password').removeClass("alert-danger")
    $('#change_ps_box .alert').last().hide()

    $('#change_ps_box button').last().removeAttr("disabled")
})

// 点击修改密码
$("#change_ps_box button").last().click(function () {
    $.ajax({
        'url': 'src/login.php',
        'type': 'POST',
        'data': {
            'action': 'change_ps',
            'username': user['username'],
            'now_password': user['password'],
            'new_password': hex_md5($('#new_password').val()),
        },
        'success': function (data) {
            request = JSON.parse(data)
            user = JSON.parse(request['data'])
            alert('密码修改成功')
            $('#change_ps_box').modal('hide')
        }
    })
})

// logout退出
$("#logout").click(function () {
    $.ajax({
        'type': 'GET',
        'url': 'src/login.php',
        'data': {
            'action': 'logout'
        },
        'success': function (data) {
            user = null
            make_banner(user)
            $('#login a').text('登录')
            $('#change_ps').hide()
            alert('退出成功')
        }
    })
})