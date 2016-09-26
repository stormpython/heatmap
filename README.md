# Kibana Heatmap Plugin
A Heatmap Plugin for Kibana 4

![Kibana Heatmap](heatmap.gif)

### Requirements
Kibana 4.3+

### Installation steps
1. Download and unpack [Kibana](https://www.elastic.co/downloads/kibana).
2. From the Kibana root directory, install the plugin with the following command:

```
$ bin/kibana plugin -i heatmap -u https://github.com/stormpython/heatmap/archive/master.zip
```

### Disclosure
This plugin is in **alpha**. There are outstanding [issues](https://github.com/stormpython/heatmap/issues) that need to be resolved for this to be a fully functioning plugin. For a quick list, please see the [to do list](#to-do-list) below.

### To Do List
- [x] [Axis label filtering](https://github.com/stormpython/heatmap/issues/1)
- [x] [Axis label rotation](https://github.com/stormpython/heatmap/issues/2)
- [x] [Fix Row Axis title positioning](https://github.com/stormpython/heatmap/issues/3)
- [x] [Legend labelling](https://github.com/stormpython/heatmap/issues/4)
- [x] [Fix bug with Range and Filter aggregations](https://github.com/stormpython/heatmap/issues/5)
- [x] [Add tooltip](https://github.com/stormpython/heatmap/issues/6)
- [x] [Fix bug with Median metric aggregations](https://github.com/stormpython/heatmap/issues/7)
- [x] [Fix scrollbar issue after re-sizing visualization](https://github.com/stormpython/heatmap/issues/8)
- [x] [Add date formatting](https://github.com/stormpython/heatmap/issues/9)
- [x] [Add metric (number) formatting](https://github.com/stormpython/heatmap/issues/10)
- [x] [Add user options](https://github.com/stormpython/heatmap/issues/11)

### Issues
Please file issues [here](https://github.com/stormpython/heatmap/issues).
