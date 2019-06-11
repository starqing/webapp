;
var upload = {
    error: function (msg) {
        common_ops.alert(msg);
    },
    success: function (file_key) {
        if (!file_key) {
            return;
        }
        var html = '<img src="' + common_ops.buildPicUrl(file_key) + '"/>'
                + '<span class="fa fa-times-circle del del_image" data="' + file_key + '"></span>';

        if ($(".upload_pic_wrap .pic-each").size() > 0) {
            $(".upload_pic_wrap .pic-each").html(html);
        } else {
            $(".upload_pic_wrap").append('<span class="pic-each">' + html + '</span>');
        }
        food_set_ops.delete_img();
    }
};
var food_set_ops = {
    init: function () {
        this.ue = null;
        this.eventBind();
        this.initEditor();
        this.delete_img();
        this.datepicker_date();
    },
    eventBind: function () {
        var that = this;

        $(".wrap_food_set .upload_pic_wrap input[name=pic]").change(function () {
            $(".wrap_food_set .upload_pic_wrap").submit();
        });

        $(".wrap_food_set select[name=cat_id]").select2({
            language: "zh-CN",
            width: '100%'
        });

        $(".wrap_food_set input[name=tags]").tagsInput({
            width: 'auto',
            height: 40,
            onAddTag: function (tag) {
            },
            onRemoveTag: function (tag) {
            }
        });

        $(".wrap_food_set .save").click(function () {
            var btn_target = $(this);
            if (btn_target.hasClass("disabled")) {
                common_ops.alert("正在处理!!请不要重复提交~~");
                return;
            }

            var cat_id_target = $(".wrap_food_set select[name=cat_id]");
            var cat_id = cat_id_target.val();

            var name_target = $(".wrap_food_set input[name=name]");
            var name = name_target.val();

            var price_target = $(".wrap_food_set input[name=price]");
            var price = price_target.val();
            
            var aprice=$("#active_price");
            var active_price=aprice.val();
            
            var sprice=$("#signal_price");
            var signal_price=sprice.val();

             console.log(price);
             console.log(active_price);
             console.log(signal_price);

            var summary = $.trim(that.ue.getContent());
        
        
            var study_content = $.trim(that.ue2.getContent());

            var stock_target = $(".wrap_food_set input[name=stock]");
            var stock = stock_target.val();

            var tags_target = $(".wrap_food_set input[name=tags]");
            var tags = $.trim(tags_target.val());
            var date_time=$(".wrap_food_set input[name=start_time]").val();
            var end_time=$(".wrap_food_set input[name=end_time]").val();
            if (parseInt(cat_id) < 1) {
                common_ops.tip("请选择分类~~", cat_id_target);
                return;
            }

            if (name.length < 1) {
                common_ops.alert("请输入符合规范的名称~~");
                return;
            }

            if (parseFloat(price) <= 0) {
                common_ops.tip("请输入符合规范的售卖价格~~", price_target);
                return;
            }
            if (parseFloat(active_price) <= 0) {
                common_ops.tip("请输入符合规范的活动价格~~", aprice);
                return;
            }
            if (parseFloat(signal_price) <= 0) {
                common_ops.tip("请输入符合规范的售卖价格~~",sprice);
                return;
            }
          
            if (parseInt(price)<parseInt(active_price)){
            	common_ops.tip("活动价格必须低于原价~~", aprice);
                return;
            }
            

            if ($(".wrap_food_set .pic-each").size() < 1) {
                common_ops.alert("请上传封面图~~");
                return;
            }

            if (summary.length < 10) {
                common_ops.tip("请输入课程描述，并不能少于10个字符~~", summary);
                return;
            }
            if (study_content.length < 10) {
                common_ops.tip("请输入学习内容，并不能少于10个字符~~", study_content);
                return;
            }

            if (parseInt(stock) < 1) {
                common_ops.tip("请输入符合规范的课时量~~", stock_target);
                return;
            }

            if (tags.length < 1) {
                common_ops.alert("请输入标签，便于搜索~~");
                return;
            }
                if (date_time.length < 1) {
                common_ops.alert("请输入开课时间，便于搜索~~");
                return;
            }
                if (end_time.length < 1) {
                common_ops.alert("请输入课程结束时间，便于搜索~~");
                return;
            }
            btn_target.addClass("disabled");

            var data = {
                cat_id: cat_id,
                name: name,
                price: price,
                active_price: active_price,
                signal_price:signal_price,
                main_image: $(".wrap_food_set .pic-each .del_image").attr("data"),
                summary: summary,
                stock: stock,
                tags: tags,
                study_content:study_content,
                date_time: date_time,
                end_time:end_time,
                id: $(".wrap_food_set input[name=id]").val()
            };

            $.ajax({
                url: common_ops.buildUrl("/food/set"),
                type: 'POST',
                data: data,
                dataType: 'json',
                success: function (res) {
                    btn_target.removeClass("disabled");
                    var callback = null;
                    if (res.code == 200) {
                        callback = function () {
                            window.location.href = common_ops.buildUrl("/food/index");
                        }
                    }
                    common_ops.alert(res.msg, callback);
                }
            });

        });


    },
    initEditor: function () {
        var that = this;
        that.ue = UE.getEditor('editor', {
            toolbars: [
                ['undo', 'redo', '|',
                    'bold', 'italic', 'underline', 'strikethrough', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', '|', 'rowspacingtop', 'rowspacingbottom', 'lineheight'],
                ['customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                    'directionalityltr', 'directionalityrtl', 'indent', '|',
                    'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                    'link', 'unlink'],
                ['imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
                    'insertimage', 'insertvideo', '|',
                    'horizontal', 'spechars', '|', 'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols']

            ],
            enableAutoSave: true,
            saveInterval: 60000,
            elementPathEnabled: false,
            zIndex: 4,
            serverUrl: common_ops.buildUrl('/upload/ueditor')
        });
        
              that.ue2 = UE.getEditor('content_editor', {
            toolbars: [
                ['undo', 'redo', '|',
                    'bold', 'italic', 'underline', 'strikethrough', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', '|', 'rowspacingtop', 'rowspacingbottom', 'lineheight'],
                ['customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                    'directionalityltr', 'directionalityrtl', 'indent', '|',
                    'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                    'link', 'unlink'],
                ['imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
                    'insertimage', 'insertvideo', '|',
                    'horizontal', 'spechars', '|', 'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols']

            ],
            enableAutoSave: true,
            saveInterval: 60000,
            elementPathEnabled: false,
            zIndex: 4,
            serverUrl: common_ops.buildUrl('/upload/ueditor')
        });
        
        
    },
    delete_img: function () {
        $(".wrap_food_set .del_image").unbind().click(function () {
            $(this).parent().remove();
        });
    },
    datepicker_date:function () {
            $(".wrap_food_set input[name=start_time]").datepicker({
            weekStart: 1,
            autoclose: true,
            daysOfWeekHighlighted: "0,6",
            format: "yyyy-mm-dd",
             language: "zh-CN"
            });
            $(".wrap_food_set input[name=end_time]").datepicker({
            weekStart: 1,
            autoclose: true,
            daysOfWeekHighlighted: "0,6",
            format: "yyyy-mm-dd",
             language: "zh-CN"
            });
            


    }



};

$(document).ready(function () {
    food_set_ops.init();
});