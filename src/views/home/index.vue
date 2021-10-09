<template>
  <div class="foundation__home">
    <el-form :model="model" inline size="mini">
      <el-form-item label="开始日期" prop="startDate">
        <el-date-picker type="date" v-model="model.startDate" @change="handleData" value-format="timestamp" :clearable="false"></el-date-picker>
      </el-form-item>
      <el-form-item label="结束日期" prop="endDate">
        <el-date-picker type="date" value-format="timestamp" @change="handleData" v-model="model.endDate" :clearable="false"></el-date-picker>
      </el-form-item>
      <el-form-item label="分类" prop="cate">
        <el-select v-model="model.cate" @change="handleData" multiple collapse-tags>
          <el-option v-for="(cate, idx) in cates" :key="idx" :value="cate" :label="cate"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <foundation-table size="mini" border :enablePage="false" :data="tableData" :columns="columns"></foundation-table>
  </div>
</template>

<script>
import TrendCanvas from "@/components/TrendCanvas"
import {parseTime} from "@/utils"
export default {
  name: "Home",
  components: {
    TrendCanvas
  },
  data() {
    return {
      model:{
        cate:[]
      },
      cates:[],
      codes: [
        { code: "180012", cate: "白酒/医疗" },
        { code: "162605", cate: "白酒/医疗" },
        { code: "003095", cate: "医疗" },
        { code: "005827", cate: "蓝筹" },
        { code: "004241", cate: "科技" },
        { code: "161720", cate: "证券" },
        { code: "320007", cate: "半导体" },
        { code: "011102", cate: "光伏" },
        { code: "008190", cate: "钢铁" },
        { code: "165520", cate: "有色" },
        { code: "164402", cate: "航空/军工" },
        { code: "161028", cate: "新能源车" },
        { code: "005661", cate: "化学制品" },
        { code: "161032", cate: "煤炭" },
        { code: "006327", cate: "中概互联" },
      ],
      tableData:[],
      columns: [
        {
          label: "基金名称",
          prop: "name",
        },
        {
          label: "基金代码",
          prop: "code",
          width: 100,
        },
        {
          label: "波峰净值",
          prop: "maxValue",
          width: 100,
        },
        {
          label: "波峰日期",
          prop: "maxValueDate",
          format:(row)=>{
            return parseTime(row.maxValueDate, "{y}-{m}-{d}")
          },
          width: 120,
        },
        {
          label: "波谷净值",
          prop: "minValue",
          width: 100,
        },
        {
          label: "波谷日期",
          prop: "minValueDate",
          format:(row)=>{
            return parseTime(row.minValueDate, "{y}-{m}-{d}")
          },
          width: 120,
        },
        {
          label: "最大跌幅",
          prop: "maxDecrease",
          sortable:true,
          format:(row)=>{
            return this.getCell(row.maxDecrease)
          },
          width: 110,
        },
        {
          label: "当前净值",
          prop: "curValue",
          width: 100,
        },
        {
          label: "当前跌幅",
          prop: "curDecrease",
          sortable:true,
          format:(row)=>{
            return this.getCell(row.curDecrease)
          },
          width: 110,
        },
        {
          label: "相对波谷后涨幅",
          prop: "IncAfterMinVaue",
          sortable:true,
          format:(row)=>{
            return this.getCell(row.IncAfterMinVaue)
          },
          width: 150,
        },
        // {
        //   label: "触底反弹",
        //   prop: "x",
        //   format:(row)=>{
        //     return this.getCell(Math.abs(row.maxDecrease) - Math.abs(row.curDecrease))
        //   },
        //   width: 110,
        // },
        {
          label: "走势图",
          prop: "trend",
          width: 200,
          format:(row)=>{
            return <TrendCanvas netWorthTrend={row.netWorthTrend}/>
          }
        },
        {
          label: "分类",
          prop: "cate",
          width: 120,
        },
      ],
    };
  },
  mounted() {
    this.getFoundationData();
    let endDate = new Date()
    this.cates = Array.from(new Set(this.codes.map(v=>v.cate)))
    this.model.startDate = new Date(endDate.getTime() - 180 * 24 * 60 * 60 * 1000)
    this.model.endDate = endDate
    this.model = Object.assign({}, this.model)
  },
  methods: {
    getCell(value){
      return <div>{this.getLevel(value)}<span style={{color:this.getColor(value)}}>{value.toFixed(2)}%</span></div>
    },
    getLevel(value){
      value = Math.abs(value)
      if(value > 20) {
        return '★★'
      } else if (value > 10) {
        return '★'
      }
      return ''
    },
    getColor(value){
      if(value < 0) {
        return '#47a94f'
      } else if (value > 0) {
        return 'red'
      }
      return '#000'
    },
    getFoundationData() {
      Promise.all(
        this.codes.map((v) => {
          return new Promise(res=>{
            this.$apis.app.getFoundationData({ code:v.code }).then((data) => {
              res({
                data,
                v
              })
            });
          })
        })
      ).then(data=>{
        this.foundationData = data
        this.handleData()
      })
    },
    handleData() {
      this.tableData = []
      let self = this
      this.foundationData.filter(({v})=>{
        if(this.model.cate.length) {
          return this.model.cate.includes(v.cate)
        }
        return true
      }).forEach(({data,v})=>{
        data = data.replaceAll("var ", "this.");
        let namespace = {
          fn: function () {
            eval(data);
            let Data_netWorthTrend = this.Data_netWorthTrend.filter(v=>{
              return v.x >= self.model.startDate && v.x <= self.model.endDate
            })
            let curValue = Data_netWorthTrend[Data_netWorthTrend.length - 1].y
            let curDate = Data_netWorthTrend[Data_netWorthTrend.length - 1].x
            let {maxValue, maxValueDate} = self.getMaxValue(Data_netWorthTrend)
            let { minValue = curValue, minValueDate = curDate } = self.getMinValue(Data_netWorthTrend, maxValueDate)
            self.tableData.push({
              code:v.code,
              cate:v.cate,
              name:this.fS_name,
              maxValue,
              maxValueDate,
              minValueDate,
              maxDecrease:((maxValue - minValue) / maxValue * 100) * -1,
              curDecrease:((maxValue - curValue) / maxValue * 100) * -1,
              IncAfterMinVaue:((curValue - minValue) / minValue * 100),
              minValue,
              netWorthTrend:Data_netWorthTrend,
              curValue:curValue.toFixed(4),
            })
          },
        };
        namespace.fn();
      })
    },
    getMinValue(data, maxValueDate){
      let min = null
      data.forEach(v=>{
        if(v.x > maxValueDate) {
          if(!min || min.y > v.y) {
            min = v
          }
        }
      })
      return min ? {
        minValue:min.y.toFixed(4),
        minValueDate:min.x
      } : {}
    },
    getMaxValue(data){
      let max = null
      data.forEach(v=>{
        if(!max || max.y < v.y) {
          max = v
        }
      })
      return {
        maxValue:max.y.toFixed(4),
        maxValueDate:max.x
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.foundation__home {
  padding: 30px;
}
</style>