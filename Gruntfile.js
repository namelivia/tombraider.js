module.exports = function(grunt) {
	var bannerContent = '/*! <%= pkg.name %> v<%= pkg.version %> - ' +
						   '<%= grunt.template.today("yyyy-mm-dd") %> \n' +
						   ' *  License: <%= pkg.license %> */\n';
  var name = '<%= pkg.name %>-v<%= pkg.version%>';
   
  grunt.initConfig({
	 pkg : grunt.file.readJSON('package.json'),
	 uglify: {
	  options: {
		banner: bannerContent,
		sourceMapRoot: '../',
		sourceMap: 'distrib/'+name+'.min.js.map',
		sourceMapUrl: name+'.min.js.map'
	  },
	  target : {
		src : ['src/**/*.js'],
		dest : 'dist/' + name + '.min.js'
	  }
	},
	concat: {
	  options: {
		banner: bannerContent
	  },
	  target : {
		src : ['src/**/*.js'],
		dest : 'dist/' + name + '.js'
	  }
	},
    jshint: {
      options: {
        trailing: true,
        eqeqeq: true
      },
      target: {
        src : ['src/**/*.js','test/**/*.js','Gruntfile.js']
      }
    },
	jasmine:{
        src : ['src/**/*.js'],
		options :{
        	specs : ['spec/**/*.js'],
		}
	}
  });
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['jshint','concat','uglify']);
  grunt.registerTask('test', ['jshint','jasmine']);
};
