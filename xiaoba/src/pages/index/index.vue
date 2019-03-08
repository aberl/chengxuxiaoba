<template>
  <div>
      <headerTop/>
       <section class="jumbotron text-center">
        <div class="container">
          <h1 class="jumbotron-heading">程序小巴首页大标题</h1>
          <p class="lead text-muted">课程</p>
        </div>
      </section>
      <div class="album py-5 bg-light">
          <div class="container">
            <div class="row">
                  <div class="col-md-3" @click="ToCourseDetail('JAVA')">
                    <div class="card mb-3 box-shadow">
                      <div class="card-text text-center" style="height: 200px; width: 100%; background-image: url(../static/images/primary256.png);">
                        <h3>JAVA</h3>
                      </div>
                      <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                          <small class="text-muted">100人已观看</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3" @click="ToCourseDetail('JAVA')">
                    <div class="card mb-3 box-shadow">
                      <div class="card-text text-center" style="height: 200px; width: 100%; background-image: url(../static/images/primary256.png);">
                        <h3>数据库</h3>
                      </div>
                      <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                          <small class="text-muted">100人已观看</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3" @click="ToCourseDetail('JAVA')">
                    <div class="card mb-3 box-shadow">
                      <div class="card-text text-center" style="height: 200px; width: 100%; background-image: url(../static/images/primary256.png);">
                        <h3>前端</h3>
                      </div>
                      <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                          <small class="text-muted">100人已观看</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3" @click="ToCourseDetail('JAVA')">
                    <div class="card mb-3 box-shadow">
                      <div class="card-text text-center" style="height: 200px; width: 100%; background-image: url(../static/images/primary256.png);">
                        <h3>开发工具</h3>
                      </div>
                      <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                          <small class="text-muted">100人已观看</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3" @click="ToCourseDetail('JAVA')">
                    <div class="card mb-3 box-shadow">
                      <div class="card-text text-center" style="height: 200px; width: 100%; background-image: url(../static/images/primary256.png);">
                        <h3>儿童编程</h3>
                      </div>
                      <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                          <small class="text-muted">100人已观看</small>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
        </div>
      <footerGuide/>
  </div>
</template>

<script>    
import headerTop from '../../components/Header/header.vue'
import footerGuide from '../../components/Footer/footer.vue'

export default {
  methods:{
    ToCourseDetail(){
      this.$router.push({path:'/coursedetail'});
    }
  },
components:{
    headerTop,
    footerGuide
}
}
</script>

<style>

</style>
