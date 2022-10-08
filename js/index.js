$(function () {


  // 最开始先渲染一次页面
  load();

  // 1. 按下回车键，把数据存储到 本地存储里面
  // var todoList = [{title: xxx, done: false}, {title: yyy, done: false}]
  $("#title").on('keydown', function (event) {
    // 判断是否按下回车
    if (event.keyCode === 13) {
      if (!$(this).val().trim()) {
        alert("请先输入待做事项！");
        return;
      }
      // 先要读取本地存储的数据
      let local = getData();
      console.log(local);
      // 跟新local数组，把最新的数据追加到local数组中
      local.push({
        title: $(this).val(),
        done: false
      });
      // 将local数组存储到本地
      saveData(local);

      // 2. 将本地存储中的数据渲染到也买你中
      load();

      // 将输入框中的值清空
      $(this).val('');

    }
  })

  // 读取本地存储的数据的方法
  function getData() {
    let data = localStorage.getItem("todoList");
    if (data) {
      return JSON.parse(data); // 将json字符串转化为js对象返回
    } else {
      return [];
    }
  }

  // 将数据存储到本地存储
  function saveData(data) {
    localStorage.setItem('todoList', JSON.stringify(data))
  }

  // 渲染加载数据
  function load() {
    // 每次渲染之前先将ol里面的内容清空，否则会重复渲染数据
    $("ol, ul").html("");
    // 初始化正在进行和已经完成的个数
    let todocount = 0;
    let donecount = 0;

    // 获取本地存储的todoList
    let todoList = getData();
    console.log(todoList);
    $.each(todoList, function (index, item) {
      if (item.done == true) {
        donecount++;
        let li = $(`<li><input type="checkbox" checked><p>${item.title}</p><a href="javascript:;" title="点击删除" id=${index} ></a></li>`);
        $("ul").prepend(li);
      } else {
        todocount++;
        let li = $(`<li><input type="checkbox"><p>${item.title}</p><a href="javascript:;" title="点击删除" id=${index} ></a></li>`);
        $("ol").prepend(li);
      }
      /* let li = $(`<li><input type="checkbox"><p>${item.title}</p><a href="javascript:;" title="点击删除" id=${index}></a></li>`);
      $("ol").prepend(li); */
    })
    $("#todocount").text(todocount);
    $("#donecount").text(donecount);
  }

  // 点击删除操作, 事件委托
  $("ol, ul").on("click", 'a', function () {
    // 获取点击的索引
    let index = $(this).attr('id');
    console.log(index);
    // 获取内存中的数据
    let todoList = getData();
    // 修改数据  arr.splice(index, 1); // 删除数组下标为index的元素
    todoList.splice(index, 1);
    // 存储数据
    saveData(todoList);
    // 渲染页面
    load();
  })

  // 复选框操作
  $("ul, ol").on("click", "input", function () {
    // 获取索引
    let index = $(this).siblings('a').attr('id');
    // 获取内存中的数据
    let todoList = getData();
    // 修改数据 将所点击的复选框的done属性设置为复选框的选中状态
    todoList[index].done = $(this).prop("checked");
    console.log(todoList);
    // 存储数据
    saveData(todoList);
    // 渲染页面
    load();
  })
})