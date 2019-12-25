https://cr-vue.mio3io.com/tutorials/todo.html#%E5%AE%8C%E6%88%90%E5%BD%A2


��ref �����Ŗ��O��t�����^�O�́A���\�b�h�����玟�̂悤�Ɏg�p�ł��܂��B
  this.$refs.���O

��`console.log(comment)`
  �ł͂��܂��R���\�[���ɕ\������Ȃ��B
  `console.log(comment.value)`����Ȃ��ƕ\������Ȃ��B

�����ۂɃX�g���[�W�ɕۑ������f�[�^�̃t�H�[�}�b�g

```
[
  { "id": 1, "comment": "�V����ToDo1", "state": 0 },
  { "id": 2, "comment": "�V����ToDo2", "state": 0 }
]
```

�������̋L�q�ł��̔��z���o�Ă��Ȃ��B
```
      this.todos.push({
        id: todoStorage.uid++,
        comment: comment.value,
        state: 0,
      })
```
  �F�Ȃ�todoStorage��uid�Ƃ����ϐ�������ƕ�����̂��B
  �Fcomment�̍\�����������ĂȂ��̂ŁA
    ����value�Ƃ����v���p�e�B�������΂悢�̂���������Ȃ��B
    
���t�H�[�����Ō��ɂ��鎞�A�Ȃ����L�̏������Ŗ�薳���̂��B

```
      // �t�H�[���v�f����ɂ���B
      this.$refs.comment.value = ""
      // comment.value = ""    // (��)
```
      
���E�H�b�`���[�̎g�������悤�킩��Ȃ��B
  �F�Ȃ��handler���g���Ƃ������z���o�Ă���̂��B
  �Fhandler�̒l�͂Ȃ�Ŗ����֐��Ȃ̂��B
  �F�Ȃ��deep���K�v�Ȃ̂��H

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

�����̎��̌��ʁAitem.state��0(false)�Ȃ�0�A1(true)�Ȃ�1���o���Ƃ������ƁH

```
    doChangeState(item) {
      item.state = item.state ? 0 : 1
    },
```

���N���E�h���p�\��
  �F`indexOf`�Ƃ͉���
  �F`splice`�Ƃ́H�g������������Ȃ��B�B�B
```
    // �폜�̏���
    doRemove(item) {
      var index = this.todos.indexOf(item)
      this.todos.splice(index, 1)
    },
```    
    
�� `{{ label.label }}`�A`{{ item.id }}`�A`{{ item.comment }}`
   �������̂܂ܕ\������Ă��܂��B
   ��`watch` �̑O�̃I�u�W�F�N�g�̍Ō�Ɂu,�v���t���ĂȂ��B
   
��form �^�O�́uaction=""�v���Ē��g�����Ȃ��đ��v�Ȃ̂��B

������ɕ�����Ȃ����L�̋L�q��`reduce` �̎g�������v���o���Ĕ[��
```
  computed: {
    labels() {
      return this.options.reduce(function(a, b) {
        return Object.assign(a, { [b.value]: b.label })
      }, {})
      // �L�[���猩���₷���悤�ɁA���̂悤�ɉ��H�����f�[�^���쐬
      // {0: '��ƒ�', 1: '����', -1: '���ׂ�'}
    }
 }
 ```