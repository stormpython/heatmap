# Kibana Heatmap Plugin
A Heatmap Plugin for Kibana 4

![Kibana Heatmap](heatmap.png)

### Requirements
Kibana 4.3+

### Installation steps
1. Download and unpack [Kibana](https://www.elastic.co/downloads/kibana).
2. From the Kibana root directory, install plugin with one of the following commands:

```$ bin/kibana plugin --install stormpython/heatmap```

**Alternative**

```$ bin/kibana plugin -i heatmap -u https://github.com/stormpython/heatmap/archive/master.zip```

### Disclosure
This plugin is in **alpha**. There are outstanding [issues](https://github.com/stormpython/heatmap/issues) that need to be resolved for this to be a fully functioning plugin. For a quick list, please see the [to do list](#to-do-list) below.

### To Do List
- [ ] Axis label filtering
- [ ] Axis label rotation
- [ ] Axis title positioning
- [ ] Legend labelling
- [ ] Fix bug with Range and Filter aggregations
- [ ] Add tooltip
- [ ] Fix bug with Median metric aggregations
- [ ] Fix scrollbar issue after re-sizing visualization
- [ ] Add date formatting
- [ ] Add metric (number) formatting
- [ ] Add user options

### Issues
Please file issues [here](https://github.com/stormpython/heatmap/issues).
