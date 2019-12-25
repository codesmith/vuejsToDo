// localStorage persistence
var STORAGE_KEY = 'todos-vuejs-2.0'
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}


var app = new Vue({
  el: "#app",

  // ここにテンプレートを書いていく。
  data: {
    // 使用するデータ
    todos: [],
    options: [
      { value: -1, label: 'すべて' },
      { value: 0, label: '作業中' },
      { value: 1, label: '完了' }
    ],
    current: -1
  },

  created() {
    this.todos = todoStorage.fetch()
  },

  computed: {
    computedTodos() {
      // データcurrentが-1ならすべて
      // それ以外ならcurrent とstate が一致するものだけに絞りこむ
      return this.todos.filter(function (el) {
        return this.current < 0 ? true : this.current === el.state
      }, this)
    },
    labels() {
      return this.options.reduce(function (a, b) {
        return Object.assign(a, { [b.value]: b.label })
      }, {})
      // キーから見つけやすいように、次のように加工したデータを作成
      // {0: '作業中', 1: '完了', -1: 'すべて'}
    }
  },

  watch: {
    todos: {
      handler: function (todos) {
        todoStorage.save(todos)
      },
      deep: true
    }
  },

  methods: {
    // 使用するメソッド
    doAdd(event, value) {
      // formがsubmitされたタイミングで動くメソッド
      var comment = this.$refs.comment
      console.log(comment)

      if (!comment.value.length) {
        return 0
      }

      this.todos.push({
        id: todoStorage.uid++,
        comment: comment.value,
        state: 0
      })

      // フォーム要素を空にする。
      comment.value = ''
    },

    doChangeState(item) {
      item.state = item.state ? 0 : 1
    },

    // 削除の処理
    doRemove(item) {
      var index = this.todos.indexOf(item)
      this.todos.splice(index, 1)
    },
  }

})