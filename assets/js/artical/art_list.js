//定义传送到服务器的参数
var layer=layui.layer

var q ={
    pagenum:1,//页码值
    pagesize:5,//每页选择多少条
    cate_id:"",//分类名
    state:""
}
template.defaults.imports.dataFormat=function(data){
    const dt = new Date(data);
    var y = dt.getFullYear();
    var m = dt.getMonth();
    var d = dt.getDate();

    var hh =dt.getHours();
    var mm =dt.getMinutes();
    var ss =dt.getSeconds();

    return y +'-' + m +'-'+ d +' '+hh+':'+mm+':'+ss
}
inittable()
//获取文章列表数据
function inittable(){
    $.ajax({
        method:'get',
        url:'/my/article/list',
        data:q,
        success:function(res){
            if(res.status!==0){
                layer.msg("获取列表失败");
            }
            //使用模板引擎渲染数据
            console.log(res);
            var innerhtml = template("tpl_table",res)
            $("tbody").html(innerhtml);
        }
    })
}