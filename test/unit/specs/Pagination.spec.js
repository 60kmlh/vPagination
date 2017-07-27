/* global done */
import Vue from 'vue'
import Pagination from '@/components/Pagination'
import {createCompInstance} from '../utils.js'

describe('Pagination.vue', () => {
  let vm
  it('create', () => {
    vm = createCompInstance(Pagination, {
      totalNum: 100
    })
    const elm = vm.$el
    // prev
    expect(elm.querySelector('.prev')).to.exist
    // pager
    expect(elm.querySelector('.pager')).to.exist
    // next
    expect(elm.querySelector('.next')).to.exist
    // jumper
    expect(elm.querySelector('input')).to.exist
    expect(elm.querySelector('.btn')).to.exist
  })

  it('pageSizes', () => {
    vm = createCompInstance(Pagination, {
      pageSizes: [5, 10, 20]
    })
    const elm = vm.$el
    // pageSizes
    expect([].slice.call(Object(elm.querySelectorAll('option')))
      .map(node => parseInt(node.textContent, 10)))
      .to.deep.equal([5, 10, 20])
  })

  it('pageCount', () => {
    vm = createCompInstance(Pagination, {
      pageSizes: [5, 10, 20],
      buttonCount: 10,
      totalNum: 100
    })
    const elm = vm.$el
    // pageCount
    expect([].slice.call(Object(elm.querySelectorAll('.pager'))).length)
      .to.equal(10)
  })

  it('event: toggle pageSize', (done) => {
    vm = createCompInstance(Pagination, {
      pageSizes: [5, 10, 20],
      buttonCount: 10,
      totalNum: 100
    })
    const elm = vm.$el

    elm.querySelector('select').value = 20

    // Vue.nextTick(function(done) {
    //   expect(vm.per).to.equal(20)
    //   done()
    // })
    Vue.nextTick(() => {
      elm.querySelectorAll('option')[2].click()
      setTimeout(() => {
        expect(vm.per).to.equal(5)
        done()
      }, 100)
    })
  })

  it('event: click page', () => {
    vm = createCompInstance(Pagination, {
      pageSizes: [5, 10, 20],
      buttonCount: 10,
      totalNum: 100
    })
    const elm = vm.$el

    // click 3
    elm.querySelectorAll('.pager')[2].click()

    setTimeout(() => {
      expect(elm.querySelectorAll('.pager')[2].className).to.equal('current')
      expect(vm.currentPage).to.equal(3)
      done()
    }, 100)
  })

  it('event: click prev', () => {
    vm = createCompInstance(Pagination, {
      pageSizes: [5, 10, 20],
      buttonCount: 10,
      totalNum: 100
    })
    const elm = vm.$el

    elm.querySelectorAll('.pager')[3].click()
    Vue.nextTick(() => {
      elm.querySelector('.prev').click()
      setTimeout(() => {
        expect(elm.querySelectorAll('.pager')[2].className).to.equal('current')
        expect(vm.currentPage).to.equal(3)
        done()
      }, 100)
    })
  })

  it('event: click next', () => {
    vm = createCompInstance(Pagination, {
      pageSizes: [5, 10, 20],
      buttonCount: 10,
      totalNum: 100
    })
    const elm = vm.$el

    elm.querySelectorAll('.pager')[2].click()
    Vue.nextTick(() => {
      elm.querySelector('.next').click()
      setTimeout(() => {
        expect(elm.querySelectorAll('.pager')[3].className).to.equal('current')
        expect(vm.currentPage).to.equal(4)
        done()
      }, 100)
    })
  })

  it('event: input page jump', () => {
    vm = createCompInstance(Pagination, {
      pageSizes: [5, 10, 20],
      buttonCount: 10,
      totalNum: 100
    })
    const elm = vm.$el

    elm.querySelector('input').value = 3
    elm.querySelector('.btn').click()

    setTimeout(() => {
      expect(elm.querySelectorAll('.pager')[2].className).to.equal('current')
      expect(vm.currentPage).to.equal(3)
    }, 100)
  })
  // it('should render correct contents', () => {
  //   const Constructor = Vue.extend(Hello)
  //   const vm = new Constructor().$mount()
  //   expect(vm.$el.querySelector('.hello h1').textContent)
  //     .to.equal('Welcome to Your Vue.js App')
  // })
})
