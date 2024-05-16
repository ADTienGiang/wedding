<template>
  <h2>Quản lý wedding</h2>
  <a type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="setDefault"><i
      class="fa-solid fa-circle-plus"></i> <span>Thêm wedding</span></a>
  <div class="table-container">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Id</th>
          <th>Tiêu đề</th>
          <th>Cặp đôi</th>
          <th>Quốc tịch</th>
          <th>Ý tưởng</th>
          <th>Số lượng khách</th>
          <th>Địa điểm</th>
          <th>Nội dung</th>
          <th>Hình ảnh</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(wd, index) in wedding" :key="index">
          <td>
            <div>{{ wd.id }}</div>
          </td>
        
          <td>
            <div class="max-width-td">{{ wd.tieude }}</div>
          </td>
          <td>
            <div class="max-width-td">{{ wd.capdoi }}</div>
          </td>
          <td>
            <div>{{ wd.quoctich }}</div>
          </td>
          <td>
            <div class="max-width-td">{{ wd.ytuong }}</div>
          </td>
          <td>
            <div>{{ wd.soluongkhach }}</div>
          </td>
          <td>
            <div class="noidungchitietsanphamadmin">{{ wd.diadiem }}</div>
          </td>
          <td>
            <div class="max-width-td"></div>
          </td>
          <td>
            <div class="image-container">
              <div class="image-list">
                <div class="image-item" v-for="(part, partIndex) in wd.part" :key="partIndex">
                  <img :src="part.HinhanhWedding[0].duongDan" alt="Hình ảnh part">
                </div>
              </div>
            </div>
          </td>
          <td class="thaotac">
            <a type="button" data-bs-toggle="modal" data-bs-target="#exampleModaledit1">
              <i class="bx bx-edit-alt iconmomodalchinhsuasp" @click="sendata(wd)"></i>
            </a>
            <a>
              <i class='bx bxs-coffee-togo thungrac'></i>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div id="app">
    <div class="toast-overlay" v-show="visible">
      <div class="toast-container">
        <div ref="toast" class="toast" role="alert" aria-live="assertive" aria-atomic="true"
          :class="{ 'show': visible }">
          <div class="toast-header">
            <strong class="me-auto">Thông báo</strong>
            <button @click="reload" type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div class="toast-body">
            {{ message }}
          </div>
          <div class="d-flex justify-content-center py-2">
            <button class="btn btn-light" @click="reload">Đồng ý</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Add Modal HTML -->
  <div class="modal fade modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm wedding mới</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <div class="preview">
              https://domain.com/{{ duong_dan_categoryComputed }}
            </div>
            <label for="duongdanmau">Đường dẫn (link không được trùng)</label>
            <input type="text" class="form-control" id="duongdanmau" v-model="duong_dan_categoryComputed" disabled />
          </div>
          <div class="form-group">
            <label for="tieude">Tiêu đề chính</label>
            <input type="text" class="form-control" id="tieude" v-model="tieude" />
          </div>
          <div class="form-group">
            <label for="capdoi">Tên cặp đôi</label>
            <input type="text" class="form-control" id="capdoi" v-model="capdoi" />
          </div>
          <div class="form-group">
            <label for="quoctich">Quốc tịch</label>
            <input type="text" class="form-control" id="quoctich" v-model="quoctich" />
          </div>
          <div class="form-group">
            <label for="ytuong">Ý tưởng</label>
            <input type="text" class="form-control" id="ytuong" v-model="ytuong" />
          </div>
          <div class="form-group">
            <label for="soluongkhach">Số lượng khách</label>
            <input type="text" class="form-control" id="soluongkhach" v-model="soluongkhach" />
          </div>
          <div class="form-group">
            <label for="diadiem">Địa điểm</label>
            <input type="text" class="form-control" id="diadiem" v-model="diadiem" />
          </div>
          <div class="form-group">
            <label for="theloai">Thể loại</label>
            <input type="text" class="form-control" id="theloai" v-model="theloai" />
          </div>
          <div class="form-group row-content">
            <label for="theloai">Banner wedding</label>

            <div>
              <label for="upload">
                <input type="file" id="upload" multiple @change="handleFileChange" accept="image/*">
                Chọn 1 hình banner
              </label>
            </div>
            <div class="files">
              <ul>
                <li v-for="(file, index) in filesArr" :key="index">
                  <img :src="file.url" alt="Selected File" class="file-image" style="width: 100px;" />
                  <span class="file-size">{{ getFileSize(file.size) }}</span>
                  <i class='bx bx-message-square-x' @click="removeFile(index)"></i>
                </li>
              </ul>
            </div>
          </div>
          <div class="form-group">
            <label for="trangthaihienthi">Trạng thái hiển thị</label>
            <input type="checkbox"  v-model="trangthaihienthi" />
          </div>

          <div class="modal-body">
            <div v-for="(part, index) in parts" :key="part.id">
              <h3>Phần {{ index + 1 }}</h3>
              <div class="form-group">
                <label for="title">Tiêu đề</label>
                <input type="text" class="form-control" v-model="part.title" placeholder="Nhập tiêu đề" />
              </div>
              <div class="form-group">
                <label for="content">Nội dung</label>
                <textarea class="form-control" v-model="part.content" placeholder="Nhập nội dung"></textarea>
              </div>
              <div class="form-group">
                <label for="layout">Bố cục</label>
                <select v-model="part.selectedLayoutComponent" @change="loadComponent(part)">
                  <option v-for="layout in layouts" :value="layout.id" :key="layout.id">
                    {{ layout.name }}
                  </option>
                </select>
                <component :is="part.dynamicComponent" :isAdding="isAdding"
                  @image-uploaded="handleImageUploaded(index, $event)">
                </component>
              </div>
              <button class="btn btn-danger" @click="removePart(part.id)">Xóa phần này</button>
            </div>
          </div>
          <a type="button" class="btn btn-primary" @click="addNewPart">
            <i class="fa-solid fa-circle-plus"></i> <span>Thêm phần</span>
          </a>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          <button type="button" class="btn btn-primary" @click="addWedding()">Thêm</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Edit Modal HTML -->
  <div class="modal fade modal" id="exampleModaledit" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Cập nhật wedding</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <div class="preview">
              https://domain.com/{{ duong_dan_categoryComputed }}
            </div>
            <label for="duongdanmau">Đường dẫn (link không được trùng)</label>
            <input type="text" class="form-control" id="duongdanmau" v-model="duong_dan_categoryComputed" disabled />
          </div>
          <div class="form-group">
            <label for="tieuDe">Tiêu đề chính</label>
            <input type="text" class="form-control" id="tieuDe" v-model="tieude" />
          </div>
          <div class="form-group">
            <label for="capdoi">Tên cặp đôi</label>
            <input type="text" class="form-control" id="capdoi" v-model="capdoi" />
          </div>
          <div class="form-group">
            <label for="quoctich">Quốc tịch</label>
            <input type="text" class="form-control" id="quoctich" v-model="quoctich" />
          </div>
          <div class="form-group">
            <label for="ytuong">Ý tưởng</label>
            <input type="text" class="form-control" id="ytuong" v-model="ytuong" />
          </div>
          <div class="form-group">
            <label for="soluongkhach">Số lượng khách</label>
            <input type="text" class="form-control" id="soluongkhach" v-model="soluongkhach" />
          </div>
          <div class="form-group">
            <label for="diadiem">Địa điểm</label>
            <input type="text" class="form-control" id="diadiem" v-model="diadiem" />
          </div>
          <div class="form-group">
            <label for="theloai">Thể loại</label>
            <input type="text" class="form-control" id="theloai" v-model="theloai" />
          </div>
          <div class="form-group row-content">
            <label for="theloai">Banner wedding</label>
            <div v-if="selectedWedding">
              <div class="d-flex hinhanhadminchinhsua">
                <img :src="selectedWedding.banner" alt="Banner Wedding"
                  style="width: 80px; height: 80px; margin: 10px;">
                <div class="remove_img_modal" @click="removeBanner(selectedWedding.id)">
                  <i class='bx bxs-x-square'></i>
                </div>
              </div>
            </div>

            <div>
              <label for="upload">
                <input type="file" id="upload" multiple @change="handleFileChange" accept="image/*">
                Chọn 1 hình banner
              </label>
            </div>
            <div class="files">

              <ul>
                <li v-for="(file, index) in filesArr" :key="index">
                  <img :src="file.url" alt="Selected File" class="file-image" style="width: 100px;" />
                  <span class="file-size">{{ getFileSize(file.size) }}</span>
                  <i class='bx bx-message-square-x' @click="removeFile(index)"></i>
                </li>
              </ul>
            </div>
          </div>
          <div class="form-group">
            <label for="trangthaihienthi">Trạng thái hiển thị</label>
            <input type="checkbox" id="trangthaihienthi" v-model="trangthaihienthi" />
          </div>

          <div class="modal-body">
            <div v-if="selectedWedding">
              <div v-for="(part, index) in selectedWedding.part" :key="part.id">
                <h3>Phần {{ index + 1 }}</h3>
                <div class="form-group">
                  <label for="title">Tiêu đề</label>
                  <input type="text" class="form-control" v-model="part.tieudephu" placeholder="Nhập tiêu đề" />
                </div>
                <div class="form-group">
                  <label for="content">Nội dung</label>
                  <textarea class="form-control" v-model="part.noidung" placeholder="Nhập nội dung"></textarea>
                </div>
                <div class="form-group">
                  <label for="layout">Bố cục</label>
                  <select v-model="part.bocuc" @change="loadComponentForUpdate(part)">
                    <option v-for="layout in layouts" :value="layout.id" :key="layout.id">
                      {{ layout.name }}
                    </option>
                  </select>
                </div>
                <component :part="part" :is="part.dynamicComponent" isUpdate="isUpdate" :images="selectedWedding.part" :wedding="selectedWedding" 
                  :part1="part.HinhanhWedding" :idpart="part.id" @part-updated="handlePartUpdated(index, $event)"
                  :selectedPart="selectedPart"
                  @image-uploaded="handleImageUploaded1(index, $event)">
                </component>
                <button class="btn btn-danger" @click="removePart(part.id)">Xóa phần này</button>
              </div>
            </div>
          </div>
           
          <a type="button" class="btn btn-primary" @click="addNewPart">
            <i class="fa-solid fa-circle-plus"></i> <span>Thêm phần</span>
          </a>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          <button type="button" class="btn btn-primary" @click="updateWedding()">Thêm</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import toast from '../../../components/toast.vue';
export default {
  data() {
    return {
      isAdding: true,
      isUpdate: true,
      parts: [],
      partsUpdate: [],
      selectedLayoutComponent: null,
      layouts: [
        { id: 1, name: 'Bố cục hình ảnh 1', componentName: 'boCuc1' },
        { id: 2, name: 'Bố cục hình ảnh 2', componentName: 'boCuc2' },
        { id: 3, name: 'Bố cục hình ảnh 3', componentName: 'boCuc3' },
        { id: 4, name: 'Bố cục hình ảnh 4', componentName: 'boCuc4' },
        { id: 5, name: 'Bố cục hình ảnh 5', componentName: 'boCuc5' },
        { id: 6, name: 'Bố cục hình ảnh 6', componentName: 'boCuc6' },
        { id: 7, name: 'Bố cục hình ảnh 7', componentName: 'boCuc7' },
        { id: 8, name: 'Bố cục hình ảnh 8', componentName: 'boCuc8' },
        { id: 9, name: 'Bố cục hình ảnh 9', componentName: 'boCuc9' },
        { id: 10, name: 'Bố cục hình ảnh 10', componentName: 'boCuc10' },
        { id: 11, name: 'Bố cục hình ảnh 11', componentName: 'boCuc11' },
      ],
      id: '',
      tieude: '',
      capdoi: '',
      quoctich: '',
      ytuong: '',
      soluongkhach: '',
      diadiem: '',
      theloai: '',
      duongdan: '',
      trangthaihienthi: '',
      tieudephu: '',
      noidung: '',
      bocuc: '',
      image: [],
      visible: false,
      message: '',
      wedding: [],
      duongdanmau: '',
      banner: '',
      filesArr: [],
      avatar: '',
      selectedWedding: null,
      images: [],
      partID: '',
    };
  },
  computed: {
    duong_dan_categoryComputed() {
      return this.convertToSlug(this.tieude);
    },
  },
  components: {
    toast,
  },
  created() {
    this.getWedding();
  },
  methods: {
    async getWedding() {
      try {
        const response = await this.$axios.get(`getWedding`)
        this.wedding = response.data;
        console.log(this.wedding);
        this.selectedWedding.part.forEach(part => {
          this.loadComponentForUpdate(part);
        });
      } catch (error) {

      }
    },
    sendata(a) {
     console.log(a.id)
     this.id = a.id;
     this.banner = a.banner;
     this.selectedWedding = a;
     this.tieude = a.tieude;
     this.capdoi = a.capdoi;
     this.quoctich = a.quoctich;
     this.ytuong = a.ytuong;
     this.soluongkhach = a.soluongkhach;
     this.diadiem = a.diadiem;
     this.theloai = a.theloai;
     this.duongdan = a.duongdan;
     this.trangthaihienthi = a.trangthaihienthi;
     console.log(this.banner)
     this.image = [];
     this.visible = false;
     this.message = '';
     this.duongdanmau = '';
     this.filesArr = [];
     this.avatar = '';
     this.selectedWedding.part.forEach(part => {
       this.loadComponentForUpdate(part);
     });
     this.parts.forEach(part => {
         part.image = []; // Khởi tạo mảng hình ảnh cho mỗi phần
     });

     a.part.forEach((part, partIndex) => {
         if (part.HinhanhWedding) {
             part.HinhanhWedding.forEach(image => {
                 // Kiểm tra xem có hình ảnh trong phần này không
                 if (this.parts[partIndex]) {
                     this.parts[partIndex].image.push(image.duongDan);
                 }
             });
         }
     });
   },
    loadComponent(part) {
      const componentName = this.layouts.find(layout => layout.id === parseInt(part.selectedLayoutComponent)).componentName;
      import(`../../../components/layout-wedding/${componentName}.vue`)
        .then(component => {
          part.dynamicComponent = component.default;
        })
        .catch(error => console.error("Failed to load the component", error));
    },
    loadComponentForUpdate(part) {
      console.log(part);
      const layoutId = parseInt(part.bocuc);
      const layout = this.layouts.find(layout => layout.id === layoutId);
      if (layout) {
        const componentName = layout.componentName;
        import(`../../../components/layout-wedding/${componentName}.vue`)
          .then(component => {
            part.dynamicComponent = component.default;
            part.idpart = part.id;

            const selectedPart = {
                id: part.id,
                idwedding: part.idwedding,
                bocuc: part.bocuc,
                noidung: part.noidung,
                tieudephu: part.tieudephu,
                stt: part.stt,
                HinhanhWedding: part.HinhanhWedding
            };

            // Gửi dữ liệu lọc được đến component con
            this.selectedPart = selectedPart;
          })
          
          .catch(error => console.error("Failed to load the component", error));
      } else {
        console.error(`Layout with ID ${layoutId} not found.`);
      }
    },
    handlePartUpdated(index, updatedPartData) {
      console.log(`Part at index ${index} updated:`, updatedPartData);
      this.partsUpdate = updatedPartData;
    },
    handleImageUploaded(partIndex, imageData) {
      console.log(imageData)
      if (partIndex >= 0 && partIndex < this.parts.length) {
        const part = this.parts[partIndex];
        if (part && Array.isArray(part.image)) {
          part.image.push(imageData);
          console.log(this.parts)
        } else {
          console.error("Phần không tồn tại hoặc không có thuộc tính 'images'.", part);
        }
      } else {
        console.error("Chỉ mục phần không hợp lệ: ", partIndex);
      }
    },
    handleImageUploaded1(partIndex, imageData) {
      this.addNewPart();
      if (partIndex >= 0 && partIndex < this.parts.length) {
        const part = this.parts[partIndex];
        part.image.push({ index: partIndex, image: imageData.image });
        part.title = this.partsUpdate.tieudephu; // Thêm title vào part
        part.content = this.partsUpdate.noidung; // Thêm content vào part
        part.selectedLayoutComponent = this.partsUpdate.bocuc; // Thêm selectedLayoutComponent vào part
        part.dynamicComponent = this.partsUpdate.dynamicComponent; // Thêm dynamicComponent vào part
        part.id = this.selectedWedding.part[partIndex].id;
        console.log(this.parts)
      } else {
        console.error("Chỉ mục phần không hợp lệ: ", partIndex);
      }
    },

    base64ToBlob(base64) {
      const byteString = atob(base64.split(',')[1]);
      const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    },
    async addWedding() {
      if (!this.tieude) {
        this.showToast('Chưa nhập tiêu đề chính');
        return;
      } else if (!this.capdoi) {
        this.showToast('Chưa nhập tên cặp đôi');
        return;
      } else if (!this.quoctich) {
        this.showToast('Chưa nhập quốc tịch');
        return;
      } else if (!this.ytuong) {
        this.showToast('Chưa nhập ý tưởng');
        return;
      } else if (!this.soluongkhach) {
        this.showToast('Chưa nhập số lượng khách');
        return;
      } else if (!this.diadiem) {
        this.showToast('Chưa nhập địa điểm');
        return;
      }
      const formData = new FormData();
      this.parts.forEach((part, index) => {
        formData.append(`parts[${index}][title]`, part.title);
        formData.append(`parts[${index}][content]`, part.content);
        formData.append(`parts[${index}][layout]`, part.selectedLayoutComponent);
        if (part.image && Array.isArray(part.image)) {
          part.image.forEach((imgObj, imageIndex) => {
            const blob = this.base64ToBlob(imgObj.image);
            formData.append(`images[]`, blob, `part${index}_image${imageIndex}.jpg`);
          });
        }
      });
      console.log(this.parts)
      // Append the main banner image for the wedding if available
      if (this.avatar && this.avatar.length > 0) {
        Array.from(this.avatar).forEach(file => {
          formData.append('banner', file, file.name);
        });
      }
      console.log(this.avatar)
      formData.append('tieude', this.tieude);
      formData.append('duongdan', this.duong_dan_categoryComputed);
      formData.append('theloai', this.theloai);
      formData.append('capdoi', this.capdoi);
      formData.append('trangthaihienthi', this.trangthaihienthi);

      formData.append('quoctich', this.quoctich);
      formData.append('ytuong', this.ytuong);
      formData.append('soluongkhach', this.soluongkhach);
      formData.append('diadiem', this.diadiem);

      try {
        const wedding = await this.$axios.post(
          'addWedding',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
          }
        );
        this.showToast(wedding.data.message);
        await this.getWedding();
      } catch (error) {
        console.error('Lỗi khi thêm wedding:', error);
      }
    },
    async updateWedding() {
      console.log(this.id)
      if (!this.tieude) {
        this.showToast('Chưa nhập tiêu đề chính');
        return;
      } else if (!this.capdoi) {
        this.showToast('Chưa nhập tên cặp đôi');
        return;
      } else if (!this.quoctich) {
        this.showToast('Chưa nhập quốc tịch');
        return;
      } else if (!this.ytuong) {
        this.showToast('Chưa nhập ý tưởng');
        return;
      } else if (!this.soluongkhach) {
        this.showToast('Chưa nhập số lượng khách');
        return;
      } else if (!this.diadiem) {
        this.showToast('Chưa nhập địa điểm');
        return;
      }

      const formData = new FormData();
      this.parts.forEach((part, index) => {
    formData.append(`parts[${index}][id]`, part.id);
    formData.append(`parts[${index}][title]`, part.title);
    formData.append(`parts[${index}][content]`, part.content);
    formData.append(`parts[${index}][layout]`, part.selectedLayoutComponent);

    // Chỉ thêm ảnh nếu có sự thay đổi về ảnh
    if (part.image && Array.isArray(part.image) && part.image.length > 0) {
      part.image.forEach((imgObj, imageIndex) => {
        const blob = this.base64ToBlob(imgObj.image);
        formData.append(`images[]`, blob, `part${index}_image${imageIndex}.jpg`);
      });
    }
  });

      console.log(this.parts)
      // Append the main banner image for the wedding if available
      if (this.avatar && this.avatar.length > 0) {
        Array.from(this.avatar).forEach(file => {
          formData.append('banner', file, file.name);
        });
      }
      console.log(this.avatar)
      formData.append('tieude', this.tieude);
      formData.append('duongdan', this.duong_dan_categoryComputed);
      formData.append('theloai', this.theloai);
      formData.append('capdoi', this.capdoi);
      formData.append('trangthaihienthi', this.trangthaihienthi);
      formData.append('quoctich', this.quoctich);
      formData.append('ytuong', this.ytuong);
      formData.append('soluongkhach', this.soluongkhach);
      formData.append('diadiem', this.diadiem);

      try {
        const wedding = await this.$axios.put(
          `updateWedding/${this.id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
          }
        );
        this.parts=[];
        this.showToast(wedding.data.message);
        await this.getWedding();
      } catch (error) {
        console.error('Lỗi khi cập nhật wedding:', error);
      }
    },
    async removeBanner(imageId) {
      console.log(imageId);
      try {
        const response = await this.$axios.delete(`deleteImage/${imageId}`);
        this.showToast(response.data.message);
        this.banner = null;
      } catch (error) {
        console.error('Lỗi khi xóa hình ảnh:', error);
      }
    },
    addNewPart() {
      const newPart = {
        id: '',
        title: '',
        content: '',
        selectedLayoutComponent: null,
        dynamicComponent: null,
        image: [],

      };
      this.parts.push(newPart);
      console.log("Part added, new parts array:", this.parts);
    },
    removePart(id) {
      const index = this.parts.findIndex(part => part.id === id);
      if (index !== -1) {
        this.parts.splice(index, 1);
        this.image.splice(index, 1);
      }
    },
    savePost() {
      console.log('Saving post:', this.parts);
    },
    showToast(message) {
      this.message = message
      this.visible = true
    },
    reload() {
      this.visible = false
    },
    convertToSlug(text) {
      text = text.toLowerCase();
      text = text.replace(/[àáảãạăắằẳẵặâấầẩẫậ]/g, 'a');
      text = text.replace(/[èéẻẽẹêếềểễệ]/g, 'e');
      text = text.replace(/[ìíỉĩị]/g, 'i');
      text = text.replace(/[òóỏõọôốồổỗộơớờởỡợ]/g, 'o');
      text = text.replace(/[ùúủũụưứừửữự]/g, 'u');
      text = text.replace(/[ỳýỷỹỵ]/g, 'y');
      text = text.replace(/[đ]/g, 'd');
      text = text.replace(/\s+/g, '-');
      text = text.replace(/[^\w\s-]/g, '');
      return text;
    },
    getFileSize(size) {
      let suffix = "bytes";
      if (size >= 1024 && size < 1024000) {
        suffix = "KB";
        size = Math.round((size / 1024) * 100) / 100;
      } else if (size >= 1024000) {
        suffix = "MB";
        size = Math.round((size / 1024000) * 100) / 100;
      }
      return `${size} ${suffix}`;
    },
    removeFile(index) {
      URL.revokeObjectURL(this.filesArr[index].url);
      this.filesArr.splice(index, 1);
    },
    mergeImages() {
      this.allImages = [...this.selectedProduct.images, ...this.filesArr.map(file => file.url)];
    },
    handleFileChange(event) {
      const files = event.target.files;
      this.avatar = files;
      const filesArr = Array.from(files);
      for (let i = 0; i < filesArr.length; i++) {
        const file = filesArr[i];
        file.url = URL.createObjectURL(file); // Thêm thuộc tính url vào tệp
      }
      this.filesArr = filesArr;
    },
    setDefault() {

      this.tieude = '';
      this.capdoi = '';
      this.quoctich = '';
      this.ytuong = '';
      this.soluongkhach = '';
      this.diadiem = '';
      this.theloai = '';
      this.duongdan = '';
      this.trangthaihienthi = '';
      this.tieudephu = '';
      this.noidung = '';
      this.bocuc = '';
      this.duongdanmau = '';
      this.banner = '';
    },
  },
};
</script>
<style>
.toast-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  pointer-events: auto;
}

.toast-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
}
</style>
