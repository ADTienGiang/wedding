<template>
  <div class="container">
    <div class="table-wrapper">
      <div class="table-title">
        <div class="row">
            <h2>Quản lý <b>DANH MỤC</b></h2>
            <a type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"><i
                class="fa-solid fa-circle-plus"></i> <span>Thêm danh mục</span></a>
        </div>
      </div>
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Tên danh mục:</th>
            <th>Actions:</th>
          </tr>
        </thead>
        <tbody>
          <tr  v-for="danhMucs in danhMuc">
            <td >{{ danhMucs.tenDanhMuc }}</td>
            <td>
              <a type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModaledit"><i
                  class="fa-solid fa-spinner"   @click="select(danhMucs)"></i></a>
              <a class="delete" @click="deleteCat(danhMucs.id)" ><i class="fa-solid fa-trash-can" ></i></a>
            </td>
          </tr>
        </tbody>
      </table>


    </div>
  </div>
  <toast ref="toast"></toast>
  <!-- Add Modal HTML -->

  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm danh mục </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        
          <div class="form-group">
            <label>Tên danh mục:</label>
            <input type="text" class="form-control" v-model="tenDanhMuc">
            <div v-if="tenDanhMuc === ''">
              <p style="color: red;">Không được để trống</p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          <button type="button" class="btn btn-primary" @click="addCat">Thêm</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Edit Modal HTML -->
  <div class="modal fade" id="exampleModaledit" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Sửa danh mục</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Tên danh mục:</label>
            <input type="text" class="form-control" v-model="tenDanhMuc">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          <button type="button" class="btn btn-primary" @click="updateCat">Cập nhập</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import toast from '../components/toast.vue';

export default
  {
    data() {
      return {
        danhMuc: [],
        tenDanhMuc: '',
        id: ''
      }
    },
    components: {
      toast
    },
    mounted() {
      // this.getCat();

    },
    methods: {
      select(danhMuc) {
        this.tenDanhMuc = danhMuc.tenDanhMuc,
        this.id = danhMuc.id
        console.log(this.id)
      },
      async addCat() {
        const catadd = await this.$axios.post(
          'addcat',
          {
            tenDanhMuc: this.tenDanhMuc,
          }
        )
        this.$refs.toast.showToast(catadd.data.message)
        this.getCat()
      },
      async getCat() {
        try {
          const result = await this.$axios.get(
            `getcat`
          );
          this.danhMuc = result.data;
          console.log(result);

        } catch (e) {
          console.log(e);
        }
      },
      async updateCat() {
        const catupdate = await this.$axios.put(
          `updatecat/` + this.id,
          {
            tenDanhMuc: this.tenDanhMuc,
          }
        )
        console.log(catupdate)
        this.$refs.toast.showToast(catupdate.data.message)
        this.getCat()

      },
      async deleteCat(id) {
    
        try {
          const catdelete = await this.$axios.delete(
          `deletecat/` + id,
        )
        this.$refs.toast.showToast(catdelete.data.message)
        } catch (error) {
          this.$refs.toast.showToast(catdelete.data.message)
        }
       
        this.getCat()

      },
    }
  }
</script>