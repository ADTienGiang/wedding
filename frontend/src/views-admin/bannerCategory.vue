<template>
    <div class="banner-management">
        <h2>Quản lý banner danh mục</h2>

        <div class="selection-container">
            <label for="cat_id">Danh mục</label>
            <select id="cat_id" v-model="maDanhMuc" required>
                <option disabled>Chọn danh mục</option>
                <option v-for="catsex in danhMuc" :key="catsex.id" :value="catsex.id">{{ catsex.tenDanhMuc }}</option>
            </select>
        </div>
        <div class="container">
            <form @submit.prevent="submitForm">
                <div class="file-upload">
                    <label for="upload">
                        <input type="file" id="upload" multiple @change="handleFileChange" accept="image/*">Chọn hình
                        ảnh
                    </label>
                </div>
                <div class="files">
                    <h2>Hình đã chọn</h2>
                    <ul>
                        <li v-for="(file, index) in filesArr" :key="index">
                            <img :src="getFileUrl(file)" alt="Selected File" class="file-image" />
                            <span class="file-size">{{ getFileSize(file.size) }}</span>
                            <i class='bx bx-message-square-x' @click="removeFile(index)"></i>
                        </li>
                    </ul>
                </div>

                
                <input type="submit" value="Gửi" />
            </form>
        </div>
        <div class="table-container">
            <table class="table">
                <thead>
                    <tr>
                        <th>Tên danh mục</th>
                        <th>Hình ảnh</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(banner, index) in HinhAnhDanhMuc" :key="index">
                        <td>
                            <div class="max-width-td">{{ getCategoryName(banner.MaDM) }}</div>
                        </td>
                        <td>
                            <div class="image-container">
                                <div class="image-list">
                                    <div class="image-item">
                                        <img :src="banner.duongDan" alt="">
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="thaotac">
                            <a @click="removeBanner(banner.id)">
                                <i class='bx bxs-coffee-togo'></i>
                            </a>
                        </td>
                    </tr>
                </tbody>

            </table>
        </div>
    </div>
    <toast ref="toast"></toast>
</template>

<script>
import toast from '../components/toast.vue';
export default {
    data() {
        return {
            files: [],
            filesArr: [],
            danhMuc: [],
            HinhAnhDanhMuc: [],
            tenDanhMuc: '',
            maDanhMuc: ''
        };
    },
    components: {
        toast,
    },
    computed: {
        filteredImages() {
            return this.HinhAnhDanhMuc.filter(banner => banner.MaDM === this.maDanhMuc);
        }
    },
    mounted() {
        // this.getHinhAnhDanhmuc();
        // this.getCat();
    },
    methods: {

        async getHinhAnhDanhmuc() {
            try {
                // Gọi API để lấy danh sách banner từ server
                const response = await this.$axios.get('getBannerCategory');
                this.HinhAnhDanhMuc = response.data;
            } catch (error) {
                console.error('Lỗi khi lấy danh sách banner từ server', error);
            }
        },
        getFileUrl(file) {
            return URL.createObjectURL(file);
        },
        handleFileChange(event) {
            const files = event.target.files;
            const filesArr = Array.from(files);
            this.files = files;
            this.filesArr = filesArr;
        },
        removeFile(index) {
            URL.revokeObjectURL(this.getFileUrl(this.filesArr[index])); // Giải phóng URL
            this.filesArr.splice(index, 1);
        },
        async removeBanner(bannerId) {
            // Assuming HinhAnhDanhMuc is the correct array holding banners
            const index = this.HinhAnhDanhMuc.findIndex(banner => banner.id === bannerId);

            if (index !== -1) {
                // Remove the banner from the local array
                this.HinhAnhDanhMuc.splice(index, 1);

                try {
                    // Send HTTP request to remove the banner from the database
                    const response = await this.$axios.delete(`deleteBannerCategory/${bannerId}`);
                    // Show success message
                    this.$refs.toast.showToast(response.data.message);
                } catch (error) {
                    console.error('Lỗi khi xóa banner:', error);
                    // Optionally, handle the error, e.g., by showing an error message
                    // this.$refs.toast.showToast('Failed to delete the banner.');
                }
            }
        },

        async submitForm() {
            try {
                if (this.filesArr.length === 0) {
                    this.$refs.toast.showToast('vui lòng chọn banner');
                } else if (!this.maDanhMuc) {
                    this.$refs.toast.showToast('chưa chọn danh mục');
                } else {
                    const formData = new FormData();
                    this.filesArr.forEach((file) => {
                        formData.append('avatar', file);
                    });
                    formData.append('maDanhMuc', this.maDanhMuc);
                    const response = await this.$axios.post('addBannerCategory', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    this.filesArr = [];
                    await this.getHinhAnhDanhmuc();
                    this.$refs.toast.showToast(response.data.message);
                }
            } catch (error) {
                console.error('Lỗi khi tải lên banner', error);
            }
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
        async getCat() {
            try {
                const result = await this.$axios.get(
                    `getcat`
                );
                this.danhMuc = result.data;
                console.log(this.danhMuc);

            } catch (e) {
                console.log(e);
            }
        },
        getCategoryName(MaDM) {
            const category = this.danhMuc.find(cat => cat.id === MaDM);
            return category ? category.tenDanhMuc : 'Unknown Category';
        }
    },
};
</script>




<style scoped>
/* General Styles */
* {
    box-sizing: border-box;
}

/* Container and Layout */
.banner-management .selection-container,
.banner-management .container,
.banner-management .table-container {
    padding: 0 2rem;
}

/* Form Elements Styling */
.banner-management select,
.banner-management input[type="submit"] {
    display: block;
    width: 100%;
    padding: 0.5rem;
    margin: 1rem 0;
    border-radius: 5px;
    border: 1px solid #ccc;
}

/* Button Styling */
.banner-management .btn-primary,
.banner-management .file-upload label {
    background: #0c8fda;
    color: #fff;
    padding: 1rem 3rem;
    display: inline-block;
    text-align: center;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
}

.banner-management .btn-primary:hover,
.banner-management .file-upload label:hover {
    background: #0b7fc2;
}

/* File Upload Styling */
.banner-management .file-upload input[type="file"] {
    visibility: hidden;
    position: absolute;
}

/* Selected Files Display */
.banner-management .files {
    background: #eee;
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 10px;
}

.banner-management .files ul {
    list-style: none;
    padding: 0;
    max-height: 150px;
    overflow-y: auto;
}

.banner-management .files li {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    position: relative;
}

.banner-management .files img {
    width: 100px;
    height: auto;
    margin-right: 10px;
}

.banner-management .files .file-size {
    color: #999;
    margin-left: 0.5rem;
}

.banner-management .files i {
    cursor: pointer;
    position: absolute;
    right: 0;
    transform: translateY(-50%);
}

/* Table Styling */
.table {
    width: 100%;
    border-collapse: collapse;
}

.table th,
.table td {
    text-align: left;
    padding: 8px;
}

.table tr:nth-child(even) {
    background-color: #f2f2f2;
}

.thaotac {
    cursor: pointer;
}
</style>
