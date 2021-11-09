     // 1.1 获取裁剪区域的 DOM 元素
     var $image = $('#image')
     var layer = layui.layer;
     // 1.2 配置选项
     const options = {
       // 纵横比
       aspectRatio: 1,
       // 指定预览区域
       preview: '.img-preview'
     }
   
     // 1.3 创建裁剪区域
     $image.cropper(options)

     //创建选择图像框
     $("#upload").on("click",function(){
       $("#file").click();
     })

     //上传图片
     $("#file").on("change",function(e){
       var targetFile= e.target.files;
      if(targetFile.length == 0){
        return layer.msg("请输入文件");
      }
      var file = e.target.files[0];
      var newImgURL=URL.createObjectURL(file);
      $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径
      .cropper(options)        // 重新初始化裁剪区域
     })

     //实现上传效果
     $("#uploaded").on("click",function(){

      //将图片转为base64格式，再导入src直接使用
      //只有小图片适合转为base64，因为文件会增大大概30%
      var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
      $.ajax({
        method:"post",
        url:"/my/update/avatar",
        data:{
          avatar:dataURL
        },
        success:function(res){
          if(res.status!==0){
            return layer.msg("更新头像失败");
          }
          console.log(res)
          console.log();
          window.parent.getUserInfo();
        }
      })
     })

