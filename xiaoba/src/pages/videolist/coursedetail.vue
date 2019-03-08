<template>
  <div>
      <headerTop/>
       <section class="jumbotron text-center">
        <div class="container">
          <h1 class="jumbotron-heading">JAVA 课程</h1>
          <p class="lead text-muted">JAVA 课程</p>
        </div>
      </section>
      <div class="album py-5 bg-light">
          <div class="container">
            <div class="row">
                  <div class="col-md-3" @click="ToCourseList('JAVA')">
                    <div class="card mb-3 box-shadow">
                      <div class="card-text text-center" style="height: 200px; width: 100%; background-image: url(../static/images/primary256.png);">
                        <h3>JAVA 初级</h3>
                      </div>
                      <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                          <small class="text-muted">100人已观看</small>
                          <small class="text-muted">共100节</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3" @click="ToCourseList('JAVA')">
                    <div class="card mb-3 box-shadow">
                      <div class="card-text text-center" style="height: 200px; width: 100%; background-image: url(../static/images/primary256.png);">
                        <h3>JAVA 中级</h3>
                      </div>
                      <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                          <small class="text-muted">100人已观看</small>
                          <small class="text-muted">共100节</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3" @click="ToCourseList('JAVA')">
                    <div class="card mb-3 box-shadow">
                      <div class="card-text text-center" style="height: 200px; width: 100%; background-image: url(../static/images/primary256.png);">
                        <h3>JAVA 高级</h3>
                      </div>
                      <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                          <small class="text-muted">100人已观看</small>
                          <small class="text-muted">共100节</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="col-md-3" @click="ToCourseList('JAVA')">
                    <div class="card mb-3 box-shadow">
                      <div class="card-text text-center" style="height: 200px; width: 100%; background-image: url(../static/images/primary256.png);">
                        <h3>JAVA - SpringCloud</h3>
                      </div>
                      <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                          <small class="text-muted">100人已观看</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="col-md-3" @click="ToCourseList('JAVA')">
                    <div class="card mb-3 box-shadow">
                      <div class="card-text text-center" style="height: 200px; width: 100%; background-image: url(../static/images/primary256.png);">
                        <h3>JAVA - JDK</h3>
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
      ToCourseList(){
      this.$router.push({path:'/courselist'});
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
