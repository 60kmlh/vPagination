<template>
  <div class="pagination">
    显示行数：
    <select name="" id="" v-model='per' @change='togglePer'>
      <option v-for='(val, idx) in pageSizes' :value='val'>
        {{val}}条
      </option>
    </select>
    <div class="pages">
      <span @click='choosePage(1)'>首页</span>
      <i
       :class='[currentPage <= 1 ? "display" : "", "prev"]' 
       @click='choosePage(currentPage-1)'>
       &lt;
      </i>
      <span
       v-for='i in this.ownButtonCount' 
       :class='[start+(i-1)==currentPage?"current" : "", "pager"]' 
       @click='choosePage(start+(i-1))'>
       {{start+(i-1)}}
      </span>
      <i
       :class='[currentPage >= totalPage ? "display" : "", "next"]' 
       @click='choosePage(currentPage+1)'>
       &gt;
      </i>
      <span @click='choosePage(totalPage)'>尾页</span>
    </div>
    跳转至第 &nbsp;<input type='number' v-model='jumpToPage'> 页
      <div class="btn" @click='jumpTo'>确定</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentPage: 1, // 当前页码
        start: 0, // 显示出来的起始页码
        end: 1, // 显示出来的终止页码
        per: this.pageSizes[0], // 每页条数
        jumpToPage: '' // 跳转页码
      }
    },
    created() {
      this.calNumber()
    },
    computed: {
      // 计算总页数
      totalPage() {
        return Math.ceil(Number(this.totalNum / this.per))
      },
      // 计算显示的页码格子数
      ownButtonCount() {
        return this.buttonCount < this.totalPage ? this.buttonCount : this.totalPage
      }
    },
    methods: {
      // 计算格子起止值
      calNumber() {
        let start1 = Math.max(this.currentPage - Math.round(this.ownButtonCount / 2), 1)
        let end1 = Math.min(start1 + this.ownButtonCount - 1, this.totalPage)
        let end2 = Math.min(this.currentPage + Math.round(this.ownButtonCount / 2) - 1, this.totalPage)
        let start2 = Math.max(end2 - this.ownButtonCount + 1, 1)
        this.start = Math.min(start1, start2)
        this.end = Math.max(end1, end2)
      },
      // 更新当前页，重新计算格子起止值
      goToPage(page) {
        if (!page || page > this.totalPage || page === this.currentPage) { return }
        this.currentPage = page
        this.calNumber()
      },
      // 点击页码
      choosePage(page) {
        if (!page || page > this.totalPage || page === this.currentPage || page <= 0) { return }
        this.goToPage(page)
        this.cb(this.per, page)
      },
      // 更新每页条数
      togglePer() {
        this.goToPage(1)
        this.calNumber()
        this.cb(this.per, this.currentPage)
      },
      // 确定按钮
      jumpTo() {
        this.choosePage(this.jumpToPage)
        this.jumpToPage = ''
      }
    },
    props: {
      pageSizes: {
        type: Array,
        default: () => [10, 20, 50]
      },
      buttonCount: {
        type: Number,
        default: 5
      },
      totalNum: {
        type: Number,
        default: 0
      },
      cb: {
        type: Function,
        default: (per, page) => {
          console.log(per, page)
        }
      }
    }
  }
</script>

<style scoped>
  .pagination {
    display: inline-block;
    padding-left: 0;
    margin: 20px 0;
    border-radius: 4px;
    color: #3a87ad;
  }
  .pagination select {
    display: inline-block;
    height:26px;
    margin-right: 20px;
    border: 1px solid #bce8f1;
    color: #3a87ad;
  }
  .pagination .pages {
    display: inline-block;
    margin-right: 20px;
  }
  .pagination i, .pagination span {
    padding: 6px 12px;
    font-size: 12px;
    line-height: 1.5;
    margin-left: -1px;
    background-color: #fff;
    border: 1px solid #bce8f1;
	  color: #3a87ad;
    cursor: pointer;
  }
  .pagination i:hover, .pagination span:hover {
    background-color: #eee;
  }
  .pagination .current {
    background: #3a87ad;
    color: #fff;
	  border: 1px solid #bce8f1;
    cursor: default;
  }
  .pagination .current:hover {
    background-color: #3a87ad;
  }
  .pagination input {
    width: 40px;
    height: 20px;
    border: 1px solid #bce8f1;
  }
  .pagination .btn {
    display: inline;
    padding: 4px 10px;
    background-color: #3a87ad;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    border: 1px solid #bce8f1;
  }
  .pagination .btn:active {
    background-color: #fff;
    color: #3a87ad;
  }
  .pagination .display:hover {
    background-color: #fff;
    cursor: not-allowed;
  }
</style>
