<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  props: {
    netWorthTrend:Array
  },
  data(){
    return {
      maxValue:null,
      minValue:null
    }
  },
  mounted(){
    this.$refs.canvas.width = this.$el.offsetWidth
    this.$refs.canvas.height = 50
    this.getMaxAndMinValue()
    let k = this.$refs.canvas.height / (this.maxValue - this.minValue)
    let b = this.minValue * k * - 1
    this.splitHeightFn = (x) => x * k + b
    this.splitWidth = this.$refs.canvas.width / this.netWorthTrend.length
    this.draw()
  },
  methods:{
    getMaxAndMinValue(){
      this.netWorthTrend.forEach(v=>{
        if(v.y > this.maxValue || this.maxValue === null){
          this.maxValue = v.y
        }
        if(v.y < this.minValue || this.minValue === null) {
          this.minValue = v.y
        }
      })
    },
    draw(){
      let ctx=this.$refs.canvas.getContext('2d');
      ctx.beginPath();
      this.netWorthTrend.forEach(({y}, index)=>{
        if(!index) {
          ctx.moveTo(0, this.$refs.canvas.height - this.splitHeightFn(y))
          ctx.lineWidth = "1"
        } else {
          ctx.lineTo(index * this.splitWidth, this.$refs.canvas.height  - this.splitHeightFn(y));
        }
      })
        ctx.stroke();
    }
  }
};
</script>

<style>
</style>