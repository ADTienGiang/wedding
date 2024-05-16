<template>
  <div class="container">
    <div class="table-wrapper">
      <div class="table-title">
        <div class="row">
            <h2>Quản lý <b>Thông tin liên hệ</b></h2>
            <a type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"><i
                class="fa-solid fa-circle-plus"></i> <span>Thêm thông tin liên hệ</span></a>
        </div>
      </div>
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Email:</th>
            <th>Số điện thoại:</th>
            <th>Actions:</th>
          </tr>
        </thead>
        <tbody>
          <tr  v-for="dcchs in dcch">
            <td >{{ dcchs.email }}</td>
            <td >{{ dcchs.SDT }}</td>
            <td>
              <a type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModaledit"><i
                  class="fa-solid fa-spinner"   @click="select(dcchs)"></i></a>
              <a class="delete" @click="deleteCat(dcchs.id)" ><i class="fa-solid fa-trash-can" ></i></a>
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
          <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm thông tin liên hệ </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        
          <div class="form-group">
            <label>email:</label>
            <input type="text" class="form-control" v-model="ten">
            <div v-if="ten === ''">
              <p style="color: red;">Không được để trống</p>
            </div>
          </div>
          
          <div class="form-group">
            <label>Số điện thoại:</label>
            <input type="text" class="form-control" v-model="noiDung">
            <div v-if="noiDung === ''">
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
          <h1 class="modal-title fs-5" id="exampleModalLabel">Sửa thông tin liên hệ</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Email:</label>
            <input type="text" class="form-control" v-model="ten">
          </div>
          <div class="form-group">
            <label>Số điện thoại:</label>
            <input type="text" class="form-control" v-model="noiDung">
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
        dcch: [],
        noiDung: '',
        ten : '',
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
      select(dcch) {
        this.noiDung = dcch.noiDung,
        this.id = dcch.id
        console.log(this.id)
      },
      async addCat() {
        const catadd = await this.$axios.post(
          'addCatTTLH',
          {
            email: this.ten,
            SDT: this.noiDung,
          }
        )
        this.$refs.toast.showToast(catadd.data.message)
        this.getCat()
      },
      async getCat() {
        try {
          const result = await this.$axios.get(
            `getAllTTLH`
          );
          this.dcch = result.data;
          console.log(result);

        } catch (e) {
          console.log(e);
        }
      },
      async updateCat() {
        const catupdate = await this.$axios.put(
          `updateCatTTLH/` + this.id,
          {
            email: this.ten,
            SDT: this.noiDung,
          }
        )
        console.log(catupdate)
        this.$refs.toast.showToast(catupdate.data.message)
        this.getCat()

      },
      async deleteCat(id) {
    
        try {
          const catdelete = await this.$axios.delete(
          `deleteCatTTLH/` + id,
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