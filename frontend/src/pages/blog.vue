<template>
	<div id="full"
		class="home page-template page-template-elementor_theme page page-id-4102 wp-custom-logo stk--is-helloelementor-theme elementor-default elementor-kit-682 elementor-page elementor-page-4102">
		<header1 />
		<div data-elementor-type="archive" data-elementor-id="4533"
			class="elementor elementor-4533 elementor-4510 elementor-location-archive"
			data-elementor-post-type="elementor_library">
			<section
				class="elementor-section elementor-top-section elementor-element elementor-element-f6baf51 elementor-section-full_width elementor-section-stretched elementor-section-height-default elementor-section-height-default"
				data-id="f6baf51" data-element_type="section"
				data-settings="{&quot;stretch_section&quot;:&quot;section-stretched&quot;}">
				<div class="elementor-container elementor-column-gap-no">
					<div class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-44486cd7"
						data-id="44486cd7" data-element_type="column">
						<div class="elementor-widget-wrap elementor-element-populated">
							<div class="elementor-element elementor-element-64274f5a elementor-widget elementor-widget-image"
								data-id="64274f5a" data-element_type="widget" data-widget_type="image.default">
								<div class="elementor-widget-container">
									<img width="2048" height="711" :src="banner"
										class="attachment-2048x2048 size-2048x2048 wp-image-4516 entered lazyloaded"
										alt="" data-ll-status="loaded">
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section
				class="elementor-section elementor-top-section elementor-element elementor-element-4e72fb8 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
				data-id="4e72fb8" data-element_type="section"
				data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
				<div class="elementor-container elementor-column-gap-default">
					<div class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-4e6b569"
						data-id="4e6b569" data-element_type="column">
						<div class="elementor-widget-wrap elementor-element-populated">
							<section
								class="elementor-section elementor-inner-section elementor-element elementor-element-590684b elementor-section-content-middle elementor-section-boxed elementor-section-height-default elementor-section-height-default"
								data-id="590684b" data-element_type="section"
								data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
								<div class="elementor-container elementor-column-gap-default">
									<div class="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-59fac69"
										data-id="59fac69" data-element_type="column">
										<div class="elementor-widget-wrap elementor-element-populated">
											<div class="elementor-element elementor-element-e1754ea uael-heading-align-center elementor-widget elementor-widget-uael-advanced-heading"
												data-id="e1754ea" data-element_type="widget"
												data-widget_type="uael-advanced-heading.default">
												<div class="elementor-widget-container">

													<div class="uael-module-content uael-heading-wrapper">
														<h2 class="uael-heading">
															<span
																class="uael-heading-text elementor-inline-editing uael-size--default"
																data-elementor-setting-key="heading_title"
																data-elementor-inline-editing-toolbar="basic">{{
																gioithieu }}</span>
														</h2>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</section>
						</div>
					</div>
				</div>
			</section>
			<section
				class="elementor-section elementor-top-section elementor-element elementor-element-1d948aec elementor-section-boxed elementor-section-height-default elementor-section-height-default"
				data-id="1d948aec" data-element_type="section">
				<div class="elementor-container elementor-column-gap-no">
					<div class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-41c07932"
						data-id="41c07932" data-element_type="column">
						<div class="elementor-widget-wrap elementor-element-populated">
							<div class="elementor-element elementor-element-ec87b4f elementor-grid-2 elementor-grid-tablet-2 elementor-grid-mobile-1 elementor-posts--thumbnail-top elementor-widget elementor-widget-archive-posts"
								data-id="ec87b4f" data-element_type="widget"
								data-settings="{&quot;archive_classic_columns&quot;:&quot;2&quot;,&quot;archive_classic_columns_tablet&quot;:&quot;2&quot;,&quot;archive_classic_columns_mobile&quot;:&quot;1&quot;,&quot;archive_classic_row_gap&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:35,&quot;sizes&quot;:[]},&quot;archive_classic_row_gap_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;archive_classic_row_gap_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;pagination_type&quot;:&quot;numbers&quot;}"
								data-widget_type="archive-posts.archive_classic">
								<div class="elementor-widget-container">
									<link rel="stylesheet"
										href="/src/assets/wp-content/plugins/elementor-pro/assets/css/widget-posts.min.css">
									<div
										class="elementor-posts-container elementor-posts elementor-posts--skin-classic elementor-grid elementor-has-item-ratio">
										<article v-for="a in blog"
    class="elementor-post elementor-grid-item post-23629 post type-post status-publish format-standard has-post-thumbnail hentry category-uncategorized-vi">
    <router-link class="elementor-post__thumbnail__link" :to="'/detai-blog/' + a.duongdanchitietblog">
        <div class="elementor-post__thumbnail">
            <img width="2048" height="1365" :src="a.thumb"
                class="attachment-2048x2048 size-2048x2048 wp-image-23545 entered lazyloaded" alt=""
                data-ll-status="loaded">
        </div>
    </router-link>
    <div class="elementor-post__text">
        <h2 class="elementor-post__title">
            <router-link :to="'/detai-blog/' + a.duongdanchitietblog">
                {{ a.tieude }}
            </router-link>
        </h2>
        <div class="elementor-post__excerpt">
            <p>{{ a.mota }}</p>
        </div>

        <router-link class="elementor-post__read-more" :to="'/detai-blog/' + a.duongdanchitietblog"
            aria-label="Read more about {{ a.tieude }}">
            Read More..
        </router-link>
    </div>
</article>

									</div>

									<div class="e-load-more-anchor" data-page="1" data-max-page="2"
										data-next-page="https://theplannersvn.com/vi/blog/page/2/"></div>
									<nav class="elementor-pagination" aria-label="Pagination">
										<span aria-current="page" class="page-numbers current"><span
												class="elementor-screen-only">Page</span>1</span>
										<a class="page-numbers" href="page/2/index.html"><span
												class="elementor-screen-only">Page</span>2</a>
									</nav>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section
				class="elementor-section elementor-top-section elementor-element elementor-element-9a45a7b elementor-section-stretched elementor-section-boxed elementor-section-height-default elementor-section-height-default"
				data-id="9a45a7b" data-element_type="section"
				data-settings="{&quot;background_background&quot;:&quot;classic&quot;,&quot;stretch_section&quot;:&quot;section-stretched&quot;}">
				<div class="elementor-container elementor-column-gap-default">
					<div class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-1353007"
						data-id="1353007" data-element_type="column">
						<div class="elementor-widget-wrap elementor-element-populated">
							<div class="elementor-element elementor-element-ef4a5a7 uael-heading-align-center elementor-widget elementor-widget-uael-advanced-heading"
								data-id="ef4a5a7" data-element_type="widget"
								data-widget_type="uael-advanced-heading.default">
								<div class="elementor-widget-container">
									<div class="uael-module-content uael-heading-wrapper">
										<div class="uael-sub-heading elementor-inline-editing"
											data-elementor-setting-key="sub_heading"
											data-elementor-inline-editing-toolbar="advanced">Want to</div>
										<h2 class="uael-heading">
											<span class="uael-heading-text elementor-inline-editing uael-size--default"
												data-elementor-setting-key="heading_title"
												data-elementor-inline-editing-toolbar="basic">know more? Send us an
												email!</span>
										</h2>
									</div>
								</div>
							</div>
							<div class="elementor-element elementor-element-fb46620 elementor-align-center elementor-widget elementor-widget-button"
								data-id="fb46620" data-element_type="widget" data-widget_type="button.default">
								<div class="elementor-widget-container">
									<div class="elementor-button-wrapper">
										<a class="elementor-button elementor-button-link elementor-size-sm"
											href="../contact/index.html">
											<span class="elementor-button-content-wrapper">
												<span class="elementor-button-text">SEND MAIL</span>
											</span>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
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
			};
		},
		async created() {
			await this.getBlog();
			await this.getBannerData();
		},
		methods: {
			toggleIframe() {
				this.iframeVisible = !this.iframeVisible;
			},
			async getBlog() {
				try {
					const response = await this.$axios.get('getBlog');
					this.blog = response.data;
					console.log(this.blog)
				} catch (error) {
					console.error('Lỗi khi lấy dữ liệu từ server', error);
				}
			},
			async getBannerData() {
				try {
					const response = await this.$axios.get('getBannerContentBlog');
					if (response.data && response.data.length > 0) {
						console.log(response.data)
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
					const response = await this.$axios.get('getBlogs');
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
<style scoped>
.elementor-4533 .elementor-element.elementor-element-ec87b4f .elementor-posts-container .elementor-post__thumbnail {
	padding-bottom: calc(0.66*100%);
}
</style>