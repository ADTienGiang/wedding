<template>
	<div id="full">
		<header1 />
		<div class="wrap-main  w-clear">
			<h1 class="title-main mt-3 hidden"><span>Video</span></h1>
			<div class="content-main w-clear">
				<div class="wrap-list">
					<div class="wrap-content">
						<div class="cap1 d-flex flex-wrap justify-content-center">
							<a data-list="0" class="clicksp transition text-decoration-none active"
								data-type="video"><span>All</span></a>
						</div>
						<div class="paging-product-category">
							<div class="row row1" v-for="a in video">
								<div class="item1 col-12 col-lg-6 col-md-6 col-sm-12 animate__ animate__fadeIn wow animated"
									data-wow-delay="0s"
									style="visibility: visible; animation-delay: 0s; animation-name: fadeIn;">
									<div class="product text-center">
										<a class="pic-product hover_circle" data-toggle="modal"
											data-target="#info_video398" :title="a.tieude"><img
												:src="a.banner"
												:alt="a.tieude">
											<span class="player"><i class="far fa-play-circle"></i></span>
										</a>
										<h3 class="name-product"><a class="text-split text-decoration-none"
												data-toggle="modal" data-target="#info_video398"
												:title="a.tieude">{{ a.tieude }}</a></h3>
										<div class="desc_album">{{ a.tencapdoi }}</div>
									</div>
								</div>
								<div class="modal modal-custom fade" id="info_video398" tabindex="-1" role="dialog"
									aria-labelledby="popup-notify-label" aria-hidden="true">
									<div class="modal-dialog modal-dialog-top modal-md modal-video" role="document">
										<div class="modal-content">
											<div class="modal-header">
												<div class="name_vd">{{ a.tieude }}</div>
												<button type="button" class="close" data-dismiss="modal"
													aria-label="Close">
													<span aria-hidden="true">×</span>
												</button>
											</div>
											<div class="modal-body wrap-content">
												<div class="info_vd">
													<div class="desc_vd"></div>
												</div>
												<div class="video-show">
													<iframe width="100%" height="100%"
														:src="a.linkyt" frameborder="0"
														allowfullscreen=""></iframe>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<footer1 />
	</div>
</template>
<script>
import header1 from '../components/header.vue';
import footer1 from '../components/footer.vue';

export default {
	data() {
		return {
			video: [],
		};
	},
	components: {
		header1,
		footer1
	},
	async created() {
      await this.getVideo();
    },
	methods: {
		async getVideo() {
        try {
          const response = await this.$axios.get('getVideo');
          this.video = response.data;
          console.log(this.video)
        } catch (error) {
          console.error('Lỗi khi lấy dữ liệu từ server', error);
          this.$refs.toast.showToast('Lỗi khi lấy dữ liệu');
        }
      },
	},

};
</script>

<style scoped></style>