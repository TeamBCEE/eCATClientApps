var gulp = require('gulp');
var gutil = require('gulp-util');
var taskListing = require('gulp-task-listing');
var xSpawn = require('cross-spawn');
var Q = require('q');
var path = require('path');

var _ = require('lodash');

var tsGen = require('./tsgen-core');

// Public tasks

gulp.task('default', ['help']);

gulp.task('help', taskListing.withFilters(function (taskName) {
  var isSubTask = taskName.substr(0, 1) == "_";
  return isSubTask;
}, function (taskName) {
  var shouldRemove = taskName === 'default';
  return shouldRemove;
}));

gulp.task('generate', function () {
  generateMetadata().then(generateEntities);
});

gulp.task('generate-entities', generateEntities);

gulp.task('generate-metadata', generateMetadata);


function generateEntities() {
  var webServicesCtx = [
    {
      inputFileName: './Ecat.DataLib.Context.UserCtx.json',
      outputFolder: '../src/entities/user',
      camelCase: true,
      baseClassName: 'EntityBase',
      kebabCaseFileNames: false
    },
    {
      inputFileName: './Ecat.DataLib.Context.SchoolCtx.json',
      outputFolder: '../src/entities/school',
      camelCase: true,
      baseClassName: 'EntityBase',
      kebabCaseFileNames: false
    }
  ];

  tsGen.generate(webServicesCtx)
}

function generateMetadata() {
  // assumes that the 'breeze.tooling' github repo exists on disk at the same level as the breeze.server.net repo
  // TODO: add a check that the 'breeze.tooling' dir exists and that the metadataGenerator.dll has been created.
  var projectPath = path.resolve(__dirname, '../../')
  var webServicesProject = path.join(projectPath, 'eCatWebServices', 'Ecat.DataLib', 'bin', 'Debug', 'Ecat.DataLib');
  var generatorProject = path.join(projectPath, 'EcatBreezeTooling', 'MetadataGenerator', 'MetadataGenerator', 'bin', 'Debug', 'metadatagenerator')
  var spawnInfo = spawnExt(generatorProject,
    ['-i', webServicesProject]);
  return spawnInfo.promise;
}

// returns both a promise and the spawned process so that it can be killed if needed.
function spawnExt(command, args, options) {
  var deferred = Q.defer();
  var descr = command + " " + args.join(' ');
  var proc;
  gutil.log('running: ' + descr);
  try {
    proc = xSpawn.spawn(command, args, options);
  } catch (e) {
    gutil.log(e);
    deferred.reject(e);
    return { proc: null, promise: deferred.promise };
  }
  proc.stdout.on('data', function (data) {
    gutil.log(data.toString());
  });
  proc.stderr.on('data', function (data) {
    gutil.log(data.toString());
  });
  proc.on('close', function (data) {
    gutil.log('completed: ' + descr);
    deferred.resolve(data);
  });
  proc.on('error', function (data) {
    gutil.log('completed with error:' + descr);
    gutil.log(data.toString());
    deferred.reject(data);
  });
  return { proc: proc, promise: deferred.promise };
}

