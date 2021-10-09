<script>
export default {
  props:{
    vnode:Object | String
  },
  render(){
    return typeof this.vnode === 'string' ? <span>{this.vnode}</span> : this.vnode
  }
}
</script>
