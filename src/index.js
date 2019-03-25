class AdbUpload {
    constructor(option = {}) {
        this.imageLimit = option.imageLimit || 2100000;
        this.videoLimit = option.videoLimit || 1e20;
        this.name = option.name || 12138;
        this.isUploading = false;
        this.supportImage = [
            'emf',
            'wmf',
            'jpg',
            'jpeg',
            'jfif',
            'jpe',
            'png',
            'bmp',
            'dib',
            'rle',
            'gif',
            'emz',
            'wmz',
            'pcz',
            'cgm',
            'eps',
            'pct',
            'pict',
            'wpg',
        ];

        this.segment = option.segment || 5 * 1024 * 1024;
    }

    /**
     * 对外接口，上传图片
     * @param {*} file 
     * @param {*} onSuccess 
     * @param {*} onFail 
     */
    uploadImage(file, onSuccess, onFail) {
        this.__checkCover(file, () => {
            // 如果check成功
            this.__uploadImage(file, onSuccess, onFail);
        }, onFail);
    }

    /**
     * 对外接口，上传视频
     * @param {*} file 
     * @param {*} onSuccess 
     * @param {*} onFail 
     */
    uploadVideo(file, onSuccess, onFail) {
        this.__checkVideo(file, () => {
            // 如果check成功
            this.__uploadVideo(file, onSuccess, onFail);
        }, onFail);
    }

    /**
     * 检测上传的图片是否合法
     */
    __checkCover(file, onSuccess, onFail) {
        // 检测该图片类型是否支持
        if (!this.__checkCoverSupport(file)) {
            onFail && onFail({
                errCode: 1001,
                content: '不支持的图片'
            });

            return;
        }

        // 检测图片大小有没有超出
        if (file.size > this.imageLimit) {
            onFail && onFail({
                errCode: 1001,
                content: '图片过大'
            });

            return;
        }

        let reader = new FileReader();

        reader.onload = function(e) {
            let data = e.target.result;
            let image = new Image();

            image.onerror = function() {
                onFail && onFail({
                    errCode: 1003,
                    content: '非标准图片'
                });
            };

            image.onload = function() {
                onSuccess && onSuccess(reader.result);
            };

            image.src = data;
        };

        reader.readAsDataURL(file);
    }

    /**
     * 检测上传的图片是否支持
     */
    __checkCoverSupport(file) {
        let type = file.type.replace('image/', '');

        if (this.supportImage.indexOf(type) === -1) {
            // 不支持
            return false;
        }

        return true;
    }

    /**
     * 检测上传的视频是否合法
     */
    __checkVideo(file, onSuccess, onFail) {
        // 检测视频是否过大
        if (file.size > this.videoLimit) {
            onFail && onFail({
                errCode: 2001,
                content: '视频过大'
            });
        }

        let reader = new FileReader();
        reader.onload = function(e) {
            let data = e.target.result;
            let video = document.createElement('video');
            
            video.onload = function() {};
            video.onerror = function() {
                onFail && onFail({
                    errCode: 2002,
                    content: '非标准视频'
                });
            };
            video.oncanplaythrough = function() {
                // 这个需要一点时间
                onSuccess && onSuccess(file);
            };

            video.src = data;
        };

        reader.readAsDataURL(file);
    }

    /**
     * 真实上传图片的函数
     * @param {*} file 
     * @param {*} onSuccess 
     * @param {*} onFail 
     */
    __uploadImage(file, onSuccess, onFail) {
        onSuccess();
    }

    /**
     * 真实上传视频的函数
     * @param {*} file 
     * @param {*} onSuccess 
     * @param {*} onFail 
     */
    __uploadVideo(file, onSuccess, onFail) {
        if (this.isUploading) {
            onFail && onFail({
                errCode: 3001,
                content: '上传内容中'
            });

            return;
        }

        this.isUploading = true;

        let self = this;
        let start = 0;
        // 文件名
        let name = this.name + file.name.split('.')[1];
        let percent = 0;
        let clock = null;

        clock = setInterval(upload, 1000);

        function upload() {
            if (start >= file.size) {
                clearInterval(clock);
                return;
            }

            let end = self.segment + start;
            let blob = file.slice(start, end);
            let fd = new FormData();
            
            fd.append('fragment', blob);
            fd.append('name', name);

            percent = 100 * end / file.size;

            if (percent >= 100) {
                fd.append('end', 1);
                this.isUploading = true;
                onSuccess();
            }

            /**
             * 这里有真正发送请求的代码
             */
            // let xhr = new XMLHttpRequest();
            // xhr.open();
            // xhr.send();
            // 需要通知上传成功，调用onSuccess

            start = end;
        }   
    }
}

export default AdbUpload;