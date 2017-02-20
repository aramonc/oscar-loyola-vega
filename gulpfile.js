var gulp = require('gulp');
var revall = require('gulp-rev-all');
var awspublish = require('gulp-awspublish');
var cloudfront = require('gulp-cloudfront');
var gUtil = require('gulp-util');
var AWS = require('aws-sdk');

var aws = {
    'key': gUtil.env.aws_key,
    'secret': gUtil.env.aws_secret,
    'region': 'ca-central-1',
    'distributionId': gUtil.env.cf_distribution,
    'params': {
        'Bucket': 'oscar-loyola'
    }
};

var publisher = awspublish.create(aws);
var headers = {'Cache-Control': 'max-age=315360000, no-transform, public'};



gulp.task('deploy', function () {
    gulp.src('public/**')
        .pipe(revall.revision())
        .pipe(awspublish.gzip())
        .pipe(publisher.publish(headers))
        .pipe(publisher.cache())
        .pipe(awspublish.reporter())
        .pipe(cloudfront(aws));
});

