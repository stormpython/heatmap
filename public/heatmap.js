require('plugins/heatmap/heatmap.less');
require('plugins/heatmap/lib/heatmap_controller.js');
require('plugins/heatmap/lib/heatmap_directive.js');

function HeatmapProvider(Private) {
  var TemplateVisType = Private(require('ui/template_vis_type/TemplateVisType'));
  var Schemas = Private(require('ui/Vis/Schemas'));

  return new TemplateVisType({
    name: 'heatmap',
    title: 'Heatmap',
    description: '',
    icon: '',
    template: require('plugins/heatmap/heatmap.html'),
    params: {
      defaults: {},
      editor: require('plugins/heatmap/heatmap_vis_params.html')
    },
    schemas: new Schemas([
      {
        group: 'metrics',
        name: 'metric',
        title: 'Cell',
        min: 1,
        max: 1,
        aggFilter: ['avg', 'sum', 'count', 'min', 'max', 'median', 'cardinality'],
        defaults: [
          { schema: 'metric', type: 'count' }
        ]
      },
      {
        group: 'buckets',
        name: 'row',
        icon: '',
        title: 'Rows',
        min: 1,
        max: 1,
        aggFilter: '!geoHashGrid'
      },
      {
        group: 'buckets',
        name: 'column',
        icon: '',
        title: 'Columns',
        min: 1,
        max: 1,
        aggFilter: '!geoHashGrid'
      }
    ])
  });
}

require('ui/registry/vis_types').register(HeatmapProvider);
