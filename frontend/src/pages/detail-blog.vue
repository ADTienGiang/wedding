<template>
    <div id="full">
        <header1 />
        <div class="wrap-main  w-clear">
            <div class="wrap-content" v-if="blog">
                <h1 class="title-main"><span>{{ blog.tieude }} </span></h1>
                <div class="time-main"><i class="fas fa-calendar-week"></i><span>Ngày đăng: {{ new
                    Date(blog.createdAt).toLocaleDateString('en-GB') }}</span>
                </div>
                <div class="content-main baonoidung w-clear" id="toc-content" v-for="a in blog.hinhanhblog">
                    <p><img alt="" height="1365" :src="a.duongDan" width="2048" /></p>
                </div>
                <div class="share othernews">
                    <b>Bài viết khác:</b>
                    <ul class="list-news-other" v-for="a in otherBlogs">
                        <li><a class="text-decoration-none" :href="a.duongdanchitietblog"
                                :title="a.tieude">
                                {{ a.tieude }} - {{ new
                                    Date(blog.createdAt).toLocaleDateString('en-GB') }} </a></li>
                    </ul>

                    
                    <!-- <div class="pagination-home">
                        <ul class='pagination flex-wrap justify-content-center mb-0'>
                            <li class='page-item'><a class='page-link'>Page 1 / 3</a></li>
                            <li class='page-item active'><a class='page-link'>1</a></li>
                            <li class='page-item'><a class='page-link'
                                    href='cac-khau-chuan-bi-tiec-cuoi-trung-hoa-tu-thiet-ke-den-thuc-te@p=2.html'>2</a>
                            </li>
                            <li class='page-item'><a class='page-link'
                                    href='cac-khau-chuan-bi-tiec-cuoi-trung-hoa-tu-thiet-ke-den-thuc-te@p=3.html'>3</a>
                            </li>
                            <li class='page-item'><a class='page-link'
                                    href='cac-khau-chuan-bi-tiec-cuoi-trung-hoa-tu-thiet-ke-den-thuc-te@p=2.html'>Next</a>
                            </li>
                            <li class='page-item'><a class='page-link'
                                    href='cac-khau-chuan-bi-tiec-cuoi-trung-hoa-tu-thiet-ke-den-thuc-te@p=3.html'>Last</a>
                            </li>
                        </ul>
                    </div> -->
                </div>
            </div>
        </div>

        <footer1 />
    </div>
</template>
<script>
import header1 from '../components/header.vue';
import footer1 from '../components/footer.vue';
export default
    {
        components:
        {
            header1,
            footer1
        },
        data() {
            return {
                iframeVisible: false,
                blog: [],
                gioithieu: '',
                banner: '',
                otherBlogs: [],
            };
        },
        async created() {
            await this.getBlog();
            await this.getBannerData();
            await this.getOtherBlogs();
        },
        methods: {
            async getBlog() {
                try {
                    const path = this.$route.params.duongdanchitietblog;

                    const response = await this.$axios.get('getBlog');
                    this.blog = response.data.find(service => service.duongdanchitietblog === path);
                    console.log(this.blog)
                } catch (error) {
                    console.error('Lỗi khi lấy dữ liệu từ server', error);
                }
            },
            async getBannerData() {
                try {
                    const response = await this.$axios.get('getBannerContentBlog');
                    if (response.data && response.data.length > 0) {
                        const data = response.data[0];
                        this.id = data.id;
                        this.gioithieu = data.gioithieu;
                        this.banner = data.banner;
                    } else {
                        console.log('Không tìm thấy dữ liệu');
                    }
                } catch (error) {
                    console.error('Lỗi khi lấy dữ liệu từ server', error);
                }
            },
            async getOtherBlogs() {
                try {
                    const currentPath = this.$route.params.duongdanchitietblog;
                    const response = await this.$axios.get('getBlog');
                    const allBlogs = response.data;
                    this.otherBlogs = allBlogs.filter(blog => blog.duongdanchitietblog !== currentPath);
                    console.log(this.otherBlogs);
                } catch (error) {
                    console.error('Lỗi khi lấy dữ liệu từ server', error);
                }
            },
        }
    }
</script>
<style scoped></style>
