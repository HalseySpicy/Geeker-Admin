## ProTable 文档 📚

### 1、ProTable 属性（ProTableProps）：

> 使用 `v-bind="$attrs"` 通过属性透传将 **ProTable** 组件属性全部透传到 **el-table** 上，所以我们支持 **el-table** 的所有 **Props** 属性。在此基础上，还扩展了以下 **Props：**

|    属性名    |    类型     | 是否必传 |                默认值                 |                                               属性描述                                               |
| :----------: | :---------: | :------: | :-----------------------------------: | :--------------------------------------------------------------------------------------------------: |
|   columns    | ColumnProps |    ✅    |                   —                   |                  ProTable 组件会根据此字段渲染搜索表单与表格列，详情见 ColumnProps                   |
|  requestApi  |  Function   |    ✅    |                   —                   |                                        获取表格数据的请求 API                                        |
| requestAuto  |   Boolean   |    ❌    |                 true                  |                                    表格初始化是否自动执行请求 API                                    |
| dataCallback |  Function   |    ❌    |                   —                   |                           后台返回数据的回调函数，可对后台返回数据进行处理                           |
|    title     |   String    |    ❌    |                   —                   |                                   表格标题，目前只在打印的时候用到                                   |
|  pagination  |   Boolean   |    ❌    |                 true                  | 是否显示分页组件：pagination 为 false 后台返回数据应该没有分页信息 和 list 字段，data 就是 list 数据 |
|  initParam   |   Object    |    ❌    |                  {}                   |                           表格请求的初始化参数，该值变化会自动请求表格数据                           |
|  toolButton  |   Boolean   |    ❌    |                 true                  |                                         是否显示表格功能按钮                                         |
|    rowKey    |   String    |    ❌    |                 'id'                  |                                    当表格数据多选时，所指定的 id                                     |
|  searchCol   |   Object    |    ❌    | { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 } |                                        表格搜索项每列占比配置                                        |

### 2、Column 配置（ColumnProps）：

> 使用 `v-bind="column"` 通过属性透传将每一项 **column** 属性全部透传到 **el-table-column** 上，所以我们支持 **el-table-column** 的所有 **Props** 属性。在此基础上，还扩展了以下 **Props：**

|    属性名    |        类型        | 是否必传 | 默认值 |                                            属性描述                                             |
| :----------: | :----------------: | :------: | :----: | :---------------------------------------------------------------------------------------------: |
|     tag      |      Boolean       |    ❌    | false  |            当前单元格值是否为标签展示，可通过 enum 数据中 tagType 字段指定 tag 类型             |
|    isShow    |      Boolean       |    ❌    |  true  |                            当前列是否显示在表格内(只对 prop 列生效)                             |
|    search    |    SearchProps     |    ❌    |   —    |                                 搜索项配置，详情见 SearchProps                                  |
|     enum     | Object \| Function |    ❌    |   —    | 字典，可格式化单元格内容，还可以作为搜索框的下拉选项（字典可以为 API 请求函数，内部会自动执行） |
| isFilterEnum |      Boolean       |    ❌    |  true  |        当前单元格值是否根据 enum 格式化（例如 enum 只作为搜索项数据，不参与内容格式化）         |
|  fieldNames  |       Object       |    ❌    |   —    |                                指定字典 label && value 的 key 值                                |
| headerRender |      Function      |    ❌    |   —    |                             自定义表头内容渲染（tsx 语法、h 语法）                              |
|    render    |      Function      |    ❌    |   —    |                            自定义单元格内容渲染（tsx 语法、h 语法）                             |
|  \_children  |    ColumnProps     |    ❌    |   —    |                                            多级表头                                             |

### 3、搜索项 配置（SearchProps）：

> 使用 `v-bind="column.search.props“` 通过属性透传将 **search.props** 属性全部透传到每一项搜索组件上，所以我们支持 **input、select、tree-select、date-packer、time-picker、time-select、switch** 大部分属性，并在其基础上还扩展了以下 **Props：**

|    属性名    |  类型  | 是否必传 | 默认值 |                                                                    属性描述                                                                    |
| :----------: | :----: | :------: | :----: | :--------------------------------------------------------------------------------------------------------------------------------------------: |
|      el      | String |    ✅    |   —    | 当前项搜索框的类型，支持：input、input-number、select、select-v2、tree-select、cascader、date-packer、time-picker、time-select、switch、slider |
|    props     | Object |    ❌    |   —    |                                           根据 element plus 官方文档来传递，该属性所有值会透传到组件                                           |
| defaultValue |  Any   |    ❌    |   —    |                                                                  搜索项默认值                                                                  |
|     key      | String |    ❌    |   —    |                                                 当搜索项 key 不为 prop 属性时，可通过 key 指定                                                 |
|    order     | Number |    ❌    |   —    |                                                             搜索项排序（从小到大）                                                             |
|     span     | Number |    ❌    |   1    |                                                        搜索项所占用的列数，默认为 1 列                                                         |
|    offset    | Number |    ❌    |   —    |                                                              搜索字段左侧偏移列数                                                              |

### 4、ProTable 事件：

> 根据 **ElementPlus Table** 文档在 **ProTable** 组件上绑定事件即可，组件会通过 **$attrs** 透传给 **el-table**。
>
> [el-table 事件文档链接](https://element-plus.org/zh-CN/component/table.html#table-%E4%BA%8B%E4%BB%B6)

### 5、ProTable 方法：

> **ProTable** 组件暴露了 **el-table** 实例和一些组件内部的参数和方法：
>
> [el-table 方法文档链接](https://element-plus.org/zh-CN/component/table.html#table-%E6%96%B9%E6%B3%95)

|     方法名      |                                 描述                                  |
| :-------------: | :-------------------------------------------------------------------: |
|     element     | `el-table` 实例，可以通过`element.方法名`来调用 `el-table` 的所有方法 |
|    tableData    |                         当前页面所展示的数据                          |
|   searchParam   |                      所有的搜索参数，不包含分页                       |
|    pageable     |                          当前表格的分页数据                           |
|  getTableList   |               获取、刷新表格数据的方法（携带所有参数）                |
|      reset      |               重置表格查询参数，相当于点击重置搜索按钮                |
| clearSelection  | 清空表格所选择的数据，除此方法之外还可使用 `element.clearSelection()` |
|     enumMap     |              当前表格使用的所有字典数据（Map 数据结构）               |
|   isSelected    |                           表格是否选中数据                            |
|  selectedList   |                          表格选中的数据列表                           |
| selectedListIds |                        表格选中的数据列表的 id                        |

### 6、ProTable 插槽：

|          插槽名          |                                                                  描述                                                                   |
| :----------------------: | :-------------------------------------------------------------------------------------------------------------------------------------: |
|            —             |                                         默认插槽，支持直接在 ProTable 中写 el-table-column 标签                                         |
|       tableHeader        |                                         自定义表格头部左侧区域的插槽，一般情况该区域放操作按钮                                          |
|        toolButton        |                                                  自定义表格头部左右侧侧功能区域的插槽                                                   |
|          append          | 插入至表格最后一行之后的内容， 如果需要对表格的内容进行无限滚动操作，可能需要用到这个 slot。 若表格有合计行，该 slot 会位于合计行之上。 |
|          empty           |                                                      当表格数据为空时自定义的内容                                                       |
|        pagination        |                                                              分页组件插槽                                                               |
|      `column.prop`       |                                                           单元格的作用域插槽                                                            |
| `column.prop` + "Header" |                                                            表头的作用域插槽                                                             |
