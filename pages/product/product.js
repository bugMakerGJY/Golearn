import { $wuxFilterBar } from '../../components/wux'

Page({
  data: {
    info: [1, 1, 1],
    items: [{
      type: 'radio',
      label: '综合',
      value: 'sortByAll',
      children: [{
        label: '新品优先',
        value: 'desc',
      },
      {
        label: '评论数从高到低',
        value: 'asc',
      },
      ],
      groups: ['001'],
    },
    {
      type: 'text',
      label: '销量',
      value: 'sales',
      groups: ['002'],
    },
    {
      type: 'sort',
      label: '价格',
      value: 'price',
      groups: ['003'],
    },
    {
      type: 'filter',
      label: '筛选',
      value: 'filter',
      children: [{
        type: 'radio',
        label: 'Languages（单选）',
        value: 'language',
        children: [{
          label: 'JavaScript',
          value: 'javascript',
        },
        {
          label: 'HTML',
          value: 'html',
        },
        {
          label: 'CSS',
          value: 'css',
        },
        {
          label: 'TypeScript',
          value: 'typescript',
        },
        ],
      },
      {
        type: 'checkbox',
        label: 'Query（复选）',
        value: 'query',
        children: [{
          label: 'Angular',
          value: 'angular',
        },
        {
          label: 'Vue',
          value: 'vue',
        },
        {
          label: 'React',
          value: 'react',
        },
        {
          label: 'Avalon',
          value: 'avalon',
        },
        ],
      },
      ],
      groups: ['001', '002', '003'],
    },
    ],
  },
  onLoad() {
    this.$wuxFilterBar = $wuxFilterBar.init({
      items: this.data.items,
      onChange: (checkedItems, items) => {
        console.log(this, checkedItems, items)

        const params = {}

        checkedItems.forEach((n) => {
          if (n.checked) {
            if (n.value === 'sortByAll') {
              const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
              params.sort = n.value
              params.order = selected
            } else if (n.value === 'price') {
              params.sort = n.value
              params.order = n.sort === 1 ? 'asc' : 'desc'
            } else if (n.value === 'sales') {
              params.sort = n.value
            } else if (n.value === 'filter') {
              n.children.filter((n) => n.selected).forEach((n) => {
                if (n.value === 'language') {
                  const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
                  params.language = selected
                } else if (n.value === 'query') {
                  const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
                  params.query = selected
                }
              })
            }
          }
        })

        this.getRepos(params)
      },
    })
    this.getRepos()
  },
  getRepos(params = {}) {
    const language = params.language || 'javascript'
    const query = params.query || 'react'
    const q = `${query}+language:${language}`
    const data = Object.assign({
      q,
    }, params)

    this.$wuxFilterBar.onCloseSelect()

    wx.showLoading()
    wx.request({
      url: `https://api.github.com/search/repositories`,
      data,
      success: (res) => {
        console.log(res)

        wx.hideLoading()

        this.setData({
          repos: res.data.items.map((n) => Object.assign({}, n, {
            date: n.created_at.substr(0, 7),
          })),
        })
      },
    })
  },
})