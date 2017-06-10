$(function(){
	var ROWS = 5; // 行数
	var COLLUMS = 5; // 列数
	
	var ul = $("#gallery");
	var w = ul.width() / COLLUMS; //每张图片的宽度
	var h = ul.height() / ROWS; // 每张图片的高度
	
	for(var r = 0; r < ROWS; r++){
		for(var c = 0; c < COLLUMS; c ++) {
			var index = r * COLLUMS + c;
			$("<li><div></div></li>")
			// 在DIV中显示图片
			.find("div").css({
					"background-image": "url(img/"+ index + ".jpg)",
					"background-size": "cover"
				})
			.end()
			// 设置li的高宽，DIV的高宽在CSS中设置为100%
			.width(w).height(h)
			// 对每个li进行绝对定位
			.each(function(){
				$(this).css({
					left: c * w,
					top: r * h
				})
			})
			.attr("index", index)
			.click(onItemClick)
			// 将li追回到ul中
			.appendTo(ul);		
		}
	}
	
	
	$("#showAll").click(showAll);
	
	function showAll(){
		// 图片的缩放
		$("#gallery li div").css({"transform": "scale(0.9)"}).each(function(i){
			$(this).css({
				"background-image": "url(img/"+ i + ".jpg)",
				"background-size": "cover"
			})
		});
		
		// 位移和旋转
		$("#gallery li").each(function(i){
			var r = parseInt(i / COLLUMS);
			var c = i % COLLUMS;
			
			var tx = Math.ceil(c-COLLUMS/2) * 30;
			var ty = Math.ceil(r-ROWS/2) * 20;
			
			var rot = Math.random()* 60 - 30;
			$(this).css({"transform": "translate("+tx+"%, "+ty+"%) rotate("+rot+"deg)"})
		});
	}
	
	function showImage(index){
		$("#gallery li").css({"transform": "translate(0, 0) rotate(0deg)"})
		.find("div").css({
			"transform": "scale(1)",
			"background-image": "url(img/"+ index + ".jpg)",
			"background-size": "auto"
		}).each(function(i){
			var r = parseInt(i / COLLUMS);
			var c = i % COLLUMS;

			var x = c * 100/(COLLUMS-1);
			var y = r * 100/(ROWS-1);
			$(this).css("background-position", x + "% "+y+"%");
		});
	}

	var expend = false; // 当前是否是展开状态
	function onItemClick(){
		if (!expend){
			showAll();
			expend = true;
		}else {
			var index = $(this).attr("index");
			console.log(index);
			showImage(index);
			expend = false;
		}
	}
});