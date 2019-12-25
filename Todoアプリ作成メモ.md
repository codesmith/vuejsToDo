https://cr-vue.mio3io.com/tutorials/todo.html#%E5%AE%8C%E6%88%90%E5%BD%A2


□ref 属性で名前を付けたタグは、メソッド内から次のように使用できます。
  this.$refs.名前

★`console.log(comment)`
  ではうまくコンソールに表示されない。
  `console.log(comment.value)`じゃないと表示されない。

□実際にストレージに保存されるデータのフォーマット

```
[
  { "id": 1, "comment": "新しいToDo1", "state": 0 },
  { "id": 2, "comment": "新しいToDo2", "state": 0 }
]
```

★ここの記述でこの発想が出てこない。
```
      this.todos.push({
        id: todoStorage.uid++,
        comment: comment.value,
        state: 0,
      })
```
  ：なぜtodoStorageにuidという変数があると分かるのか。
  ：commentの構造が分かってないので、
    何故valueというプロパティが書けばよいのかが分からない。
    
★フォームを最後空にする時、なぜ下記の書き方で問題無いのか。

```
      // フォーム要素を空にする。
      this.$refs.comment.value = ""
      // comment.value = ""    // (正)
```
      
★ウォッチャーの使い方がようわからない。
  ：なんでhandlerを使うという発想が出てくるのか。
  ：handlerの値はなんで無名関数なのか。
  ：なんでdeepも必要なのか？

```
  watch: {
    todos: {
      handler: function(todos) {
        todoStorage.save(todos)
      },
      deep: true
    }
  }
```

★この式の結果、item.stateが0(false)なら0、1(true)なら1を出すということ？

```
    doChangeState(item) {
      item.state = item.state ? 0 : 1
    },
```

★クラウド利用申請
  ：`indexOf`とは何か
  ：`splice`とは？使い方が分からない。。。
```
    // 削除の処理
    doRemove(item) {
      var index = this.todos.indexOf(item)
      this.todos.splice(index, 1)
    },
```    
    
★ `{{ label.label }}`、`{{ item.id }}`、`{{ item.comment }}`
   等がそのまま表示されてしまう。
   ⇒`watch` の前のオブジェクトの最後に「,」が付いてない。
   
★form タグの「action=""」って中身書かなくて大丈夫なのか。

★激烈に分からない下記の記述⇒`reduce` の使い方を思い出して納得
```
  computed: {
    labels() {
      return this.options.reduce(function(a, b) {
        return Object.assign(a, { [b.value]: b.label })
      }, {})
      // キーから見つけやすいように、次のように加工したデータを作成
      // {0: '作業中', 1: '完了', -1: 'すべて'}
    }
 }
 ```