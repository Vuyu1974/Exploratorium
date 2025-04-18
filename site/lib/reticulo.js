(function() {

  function reticulo() {

    const ATTRIBUTES_TO_DOUBLE_COLUMN_AFTER = 5;
    const DEFAULT_STROKE_WIDTH = 3;

    const COOKIE_SPEC = {
      "show-legend": { "type": "bool", "def": 1 },
      "show-attributes": { "type": "bool", "def": 1 },
      "show-levels": { "type": "bool", "def": 0 }
    };

    function getCookie(name) {
      const spec = COOKIE_SPEC[name];
      if (!spec) {
        console.error(`getCookie: Missing spec for cookie ${name}`);
        return undefined;
      }

      const typeCast = {
        "bool": (value) => !!parseInt(value),
        "string": (value) => value
      };

      const matches = document.cookie.match(new RegExp(
        "(?:^|; *)reticulo-" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));

      return matches ?
        typeCast[spec.type](decodeURIComponent(matches[1])) :
        spec.def;
    }

    function setCookie(name, value) {
      const spec = COOKIE_SPEC[name];
      if (!spec) {
        console.error(`setCookie: Missing spec for cookie ${name}`);
        return undefined;
      }

      const typeCast = {
        "bool": (value) => (!!value)? 1: 0,
        "string": (value) => value
      };

      document.cookie = `reticulo-${name}=` + typeCast[spec.type](value) + "; path=/";
    }

    function calcDistance(link, i) {
      let ret = 0;
      if (link.source && link.source.level) {
        ret = link.source.level;
      }
      return ret * 10;
    }

    function forceTick(nodes, links) {
      nodes.attr("transform", datum => `translate(${datum.x} ${datum.y})`);

      links.attr("x1", datum => datum.source.x)
        .attr("y1", datum => datum.source.y)
        .attr("x2", datum => datum.target.x)
        .attr("y2", datum => datum.target.y);
    }

    const nodesByHash = {};
    function nodesByHashInit(nodes) {
      if (nodesByHash.__initialized__) {
        return;
      }
      nodesByHash.__initialized__ = true;
      for (let node of nodes) {
        if (node.hash) {
          nodesByHash[node.hash] = node;
        }
        if (node.concept && node.concept.md5) {
          nodesByHash[node.concept.md5] = node;
        }
      }
    }

    function getNodeByHash(nodes, hash, md5) {
      nodesByHashInit(nodes);

      let node = nodesByHash[hash];
      if (node) {
        return node;
      }
      if (!md5) {
        console.warn(`Node with hash ${hash} not found`);
        return undefined;
      }

      node = nodesByHash[md5];
      if (node) {
        return node;
      }
      console.warn(`No node with either hash ${hash} or md5 ${md5} found`);
      return undefined;
    }

    function mergeNodePos(nodes, nodePos) {
      for (let pos of nodePos) {
        let node = getNodeByHash(nodes, pos.hash, pos.concept);
        if (!node) {
          node = nodes[pos.idx];
          if (!node) {
            continue;
          }
        }
        node.x = pos.x;
        node.y = pos.y;
      }
    }

    function levelTextSetPos(textEle, config) {
      const lvlY = config.LABELS_ORIGIN_Y +
            config.NODE_RADIUS +
            (config.LABELS_SEPARATION * 2);
      textEle.attr("transform", `translate(0 ${lvlY})`)
    }

    function nodeAttributesSetPos(group, config) {
      const textBoxes = group.selectAll(".attributes-label").nodes();
      const numAttributes = textBoxes.length;
      if (numAttributes == 0)
        return;

      let x = config.LABELS_ORIGIN_X;
      let y = config.LABELS_ORIGIN_Y -
          (config.LABELS_HEIGHT / 2) -
          (config.LABELS_SEPARATION * 2);
      const start_y = y;

      const column2 = (numAttributes > ATTRIBUTES_TO_DOUBLE_COLUMN_AFTER)?
            numAttributes / 2 - 1:
            numAttributes;
      let is_column2 = false;
      for (let i = 0; i < numAttributes; i++) {
        if (i > column2 && !is_column2) {
          x = -config.LABELS_ORIGIN_X;
          y = start_y;
          is_column2 = true;
        }
        const textBox = d3.select(textBoxes[i]);
        textBox.attr("transform", `translate(${x} ${y})`);
        y -= config.LABELS_HEIGHT + config.LABELS_SEPARATION;
      }
    }

    function nodeObjectLabelsSetPos(group, config) {
      const textBoxes = group.selectAll(".objects-label").nodes();
      const numLabels = textBoxes.length;
      if (numLabels == 0)
        return;

      const x = config.LABELS_ORIGIN_X;
      let y = config.LABELS_ORIGIN_Y +
          (config.LABELS_HEIGHT / 2) +
          (config.LABELS_SEPARATION * 2);
      for (let i = 0; i < numLabels; i++) {
        const textBox = d3.select(textBoxes[i]);
        textBox.attr("transform", `translate(${x} ${y})`);
        y += config.LABELS_HEIGHT + config.LABELS_SEPARATION;
      }
    }

    function nodesApplyConfig(nodes, config) {
      d3.selectAll(".node")
        .each(function(datum) {
          const hasAttributes = datum.labelAttributes.length > 0;
          const hasLabelObjects = datum.labelObjects.length > 0;

          let group = d3.select(this);

          let dot = group.select(".node-dot");
          populateNodeDot(dot, config.NODE_RADIUS, hasAttributes, hasLabelObjects);

          let lvl_text = group.select(".node-level");
          levelTextSetPos(lvl_text, config);

          if (hasAttributes)
            nodeAttributesSetPos(group, config);
          if (hasLabelObjects)
            nodeObjectLabelsSetPos(group, config);
        });
    }

    function multiClassed(ele, classes) {
      for (const className in classes) {
        ele.classed(className, classes[className]);
      }
      return ele;
    }

    function recursiveClassed(nodes, datum, keys, classes) {
      const ele = d3.select(`.node.notvisited[hash="${datum.hash}"]`);

      if (ele.empty()) {
        return;
      }

      ele.classed("notvisited", false);
      multiClassed(ele, classes);

      for (const key of keys) {
        for (const hash of datum[key]) {
          const node = getNodeByHash(nodes, hash);

          if (node == undefined) {
            continue;
          }

          const inLinks = d3.select(`.link[source-hash="${datum.hash}"][target-hash="${node.hash}"]`);
          if (!inLinks.empty()) {
            multiClassed(inLinks, classes);
          }

          const outLinks = d3.select(`.link[source-hash="${node.hash}"][target-hash="${datum.hash}"]`);
          if (!outLinks.empty()) {
            multiClassed(outLinks, classes);
          }

          recursiveClassed(nodes, node, [ key ], classes);
        }
      }
    }

    function clearActiveSelection(nodes, links) {
      window.active_node_hash = undefined;
      nodes.classed("inactive active", false);
      links.classed("inactive active", false);
    }

    function nodeSelect(node, selected) {
      node.datum().selected = selected;
      node.classed("selected", selected);
    }

    function nodeDblclick(event, datum) {
      window.isDoubleClick = 2;
      nodeSelect(d3.select(this), !datum.selected);
    }

    function nodeClick(event, datum, graph, nodes, links) {
      event.stopPropagation();
      const node = d3.select(event.currentTarget);
      const isInfimum = node.classed("infimum");
      window.setTimeout(function() {
        if (window.isDoubleClick) {
          window.isDoubleClick--;
          return;
        }

        if (isInfimum) {
          if (node.classed("inactive")) {
            node.classed("inactive", false);
            links.filter(".infimum.active").classed("inactive", false);
          } else {
            node.classed("inactive", true);
            links.filter(".infimum.active").classed("inactive", true);
          }
          return;
        }

        if (datum.hash == window.active_node_hash) {
          clearActiveSelection(nodes, links);
          return;
        }
        window.active_node_hash = datum.hash;

        const infimumNode = nodes.filter(".infimum");
        const setInactive = infimumNode.classed("inactive") ||
              (!infimumNode.classed("inactive") && !infimumNode.classed("active"));

        nodes
          .classed("inactive", true)
          .classed("active", false);
        links
          .classed("inactive", true)
          .classed("active", false);

        nodes.classed("notvisited", true);
        recursiveClassed(graph.nodes, datum, [ "children", "parents" ],
                         { inactive: false, active: true });
        nodes.classed("notvisited", false);

        if (setInactive) {
          infimumNode.classed("inactive", true);
          links.filter(".infimum.active").classed("inactive", true);
        }
      }, 250);
    }

    function infoboxClosedCB() {
      window.info_attr_id = undefined;
    }

    function htmlIfNotEmpty(ele) {
      if (ele.empty()) {
        return "";
      }
      return ele.html();
    }

    function attributeClick(event, infobox) {
      event.stopPropagation();

      const attr = event.target.parentNode.attribute;
      const infocont = infobox.select(".cont");

      const attr_id = getAttrId(attr);

      const title = htmlIfNotEmpty(d3.select(`#attr-desc-${attr_id} .attr-desc-title`));

      if (title === "") {
        return;
      }

      if (window.info_attr_id != null &&
          attr_id == window.info_attr_id) {
        floatboxClose(infobox, infoboxClosedCB);
        return;
      }
      window.info_attr_id = attr_id;

      infocont.html("");
      infocont.append("h2")
        .html(title);
      infocont.append("div")
        .classed("formula", true)
        .html(htmlIfNotEmpty(d3.select(`#attr-desc-${attr_id} .attr-desc-formula`)));
      infocont.append("div")
        .classed("exp", true)
        .html(htmlIfNotEmpty(d3.select(`#attr-desc-${attr_id} .attr-desc-exp`)));
      infocont.append("div")
        .classed("ref", true)
        .html(htmlIfNotEmpty(d3.select(`#attr-desc-${attr_id} .attr-desc-ref`)));

      infobox.style("display", "block");
    }

    function populateNodeDot(dot, radius, hasAttributes, hasLabelObjects) {
      dot.node().replaceChildren();

      dot
        .append("circle")
        .classed("node-bg", true)
        .attr("r", radius);

      if (hasAttributes) {
        dot.append("path")
          .classed("node-new-attribute", true)
          .attr("d", `M ${-radius} 0 A ${radius} ${radius} 0 0 1 ${radius} 0 Z`);
      }

      if (hasLabelObjects) {
        dot.append("path")
          .classed("node-new-object", true)
          .attr("d", `M ${-radius} 0 A ${radius} ${radius} 0 0 0 ${radius} 0 Z`);
      }

      dot.append("circle")
        .classed("node-basic", true)
        .attr("r", radius);

      return dot.node();
    }

    function createNodeDot(radius, hasAttributes, hasLabelObjects) {
      const dot = d3.select(document.createElementNS(d3.namespaces.svg, "g"))
            .classed("node-dot", true);

      return populateNodeDot(dot, radius, hasAttributes, hasLabelObjects);
    }

    function createLink(datum) {
      const line = d3.select(document.createElementNS(d3.namespaces.svg, "line"))
            .classed("link", true)
            .attr("source-hash", datum.source.hash)
            .attr("target-hash", datum.target.hash);
      if (datum.target.level == 0) {
        line.classed("infimum", true);
      }
      return line.node();
    }

    function textBoxSetBBox(textBox, config) {
      const text = textBox.select("text");
      const rect = textBox.selectAll("rect");

      try {
        const bounds = text.node().getBBox();
        rect.attr("x", bounds.x - config.TEXTBOX_PADDING)
          .attr("y", bounds.y - config.TEXTBOX_PADDING)
          .attr("width", bounds.width + (config.TEXTBOX_PADDING * 2))
          .attr("height", bounds.height + (config.TEXTBOX_PADDING * 2));
      }
      catch (e) {
        window.setTimeout(() => textBoxSetBBox(textBox), 100);
      }
    }

    function createTextBox(eleClass, text, anchor) {
      const group = d3.select(document.createElementNS(d3.namespaces.svg, "g"))
            .classed(eleClass, true)
            .on("click", eventStop);
      group.append("rect")
        .classed(eleClass + "-box textbox-box", true);
      group.append("rect")
        .classed("textbox-bg", true);
      group.append("text")
        .classed(eleClass + "-text textbox-text", true)
        .attr("text-anchor", anchor)
        .text(text);

      return group.node();
    }

    function svgClick(event, nodes, links) {
      if (event.target.nodeName != "svg") {
        return;
      }

      clearActiveSelection(nodes, links);
    }

    function cssApplyConfig(config) {
      const sheet = new CSSStyleSheet();
      const sw = config.SCALE * DEFAULT_STROKE_WIDTH;
      sheet.replaceSync(`.diagram { --link-width: ${sw}px; --node-stroke-width: ${sw}px; }`);
      document.adoptedStyleSheets = [ sheet ];
    }

    function configApplyScale(config, scale) {
      // falsey scale is a reset in scale.
      if (!scale) {
        scale = 1.0;
      } else {
        const num = Number(scale);
        if (isNaN(num)) {
          throw (`SCALE must be a number. Value given: {scale}`);
        }
        scale = num;
      }
      config.SCALE = scale;

      affected_configs = ['NODE_RADIUS', 'LABELS_ORIGIN_X', 'LABELS_ORIGIN_Y'];
      for (let key of affected_configs) {
        if (! (key in config))
          continue;

        const orig_key = key + '_ORIG';
        if (! (orig_key in config))
          config[orig_key] = config[key];
        config[key] = config[orig_key] * scale;
      }

      cssApplyConfig(config);

      return scale;
    }

    function configSetup(config) {
      configApplyScale(config, config.SCALE);

      const url = new URL(window.location);
      config.DIAGRAM =
        url.pathname
        .replace(/\/index.html$/, "")
        .replace(/\/$/, "")
        .replace(/.*\//, "");

      if (url.hostname == '127.0.0.1' ||
          url.hostname == 'localhost') {
        config.DEV_MODE = true;
      }

      if (url.searchParams.has("editor")) {
        config.USE_EDITOR = true;
      }

      const rand_str = "?r=" + Math.random().toString().substr(2);
      const defaults = {
        ATTR_DESC_SOURCE: "attr_desc.csv",
        LATTICE_SOURCE: "lattice.json",
        POS_SOURCE: "pos.json",
        ATTR_CLASS_DESC_SOURCE: "attr_class_desc.csv"
      };
      for (key in defaults) {
        if (!config[key]) {
          config[key] = defaults[key];
        }
        if (config.DEV_MODE) {
          config[key] += rand_str;
        }
      }
    }

    function elementsSetup(config) {
      const d1 = d3.select("#d1");

      if (config.RETICLE_DISABLE) {
        const svg = d1.selectChild("svg");
        svg
          .attr("width", undefined)
          .attr("height", undefined);

        const root_group = svg.selectChild("g");

        return { d1, svg, root_group, infobox: undefined };
      }

      const svg = d1.append("svg")
            .attr("xmlns", "http://www.w3.org/2000/svg");

      svg.append("defs")
        .html('<linearGradient id="textbox-bg-gradient" x1="0" y1="0" x2="0" y2="1">' +
              '<stop class="textbox-bg-stop1" offset="0%"></stop>' +
              '<stop class="textbox-bg-stop2" offset="100%"></stop>' +
              '</linearGradient>');

      const root_group = svg.append("g");

      const infobox = floatboxSetup(d3.select("#infobox"), infoboxClosedCB);

      attributesShow(svg, getCookie("show-attributes"));
      levelsShow(svg, getCookie("show-levels"));

      return { d1, svg, root_group, infobox };
    }

    function saveJson(graph, output) {
      function replacer(key, value) {
        if (Array.isArray(this)) {
          return value;
        }
        switch (key) {
        case "":
        case "hash":
          return value;
        case "x":
        case "y":
        case "idx":
          return parseInt(value);
        case "concept":
          return value.md5;
        }
        return undefined;
      }

      const json = JSON.stringify(graph.nodes, replacer, 2);
      output.value = json;
    }

    function svgSetViewBox(svg, viewBox) {
      svg.attr("viewBox",
               [ viewBox.offsetX, viewBox.offsetY,
                 viewBox.width, viewBox.height ]);
    }

    function editorShow(editor, legend, show) {
      editor.classed("d-none", !show);

      if (show) {
        legend.select(".btn-close")
          .dispatch("click");
      }

      d3.selectAll(".navbar .diagrams a.dropdown-item")
        .each(function () {
          const url = new URL(this.href);
          if (show) {
            url.searchParams.set("editor", "");
          } else {
            url.searchParams.delete("editor");
          }
          this.href = url.href;
        });
    }

    function editorSetup(editor, diagram, legend, graph, viewBox, config) {
      editorShow(editor, legend, config.USE_EDITOR);

      const keys = ["txtJson",
                    "btnJsonGet", "btnJsonCopy",
                    "txtEleScale", "btnEleScaleSet",
                    "txtVb_offsetX", "txtVb_offsetY", "txtVb_width", "txtVb_height",
                    "btnVbReset", "btnVbSmaller", "btnVbBigger", "btnVbWide", "btnVbCopy"];
      const controls = {};
      editor.selectAll("textarea,button,input")
        .each(function (datum, idx) {
          controls[keys[idx]] = d3.select(this);
        });

      controls.btnJsonGet
        .on("click", () => saveJson(graph, controls.txtJson.node()));

      function btnJsonCopyClicked() {
        const txtJson = controls.txtJson.node();
        txtJson.select();
        navigator.clipboard.writeText(txtJson.value);
      }

      let scale = Number(config.SCALE);
      if (isNaN(scale)) scale = 1.0;
      controls.txtEleScale.attr("value", scale);

      controls.btnEleScaleSet
        .on("click", () => {
          let scale = Number(controls.txtEleScale.property("value"));
          scale = configApplyScale(config, scale);
          controls.txtEleScale.attr("value", scale);
          nodesApplyConfig(graph.nodes, config);
        });

      const origViewBox = Object.assign({}, viewBox);

      function populateViewBoxInputs(viewBox) {
        for (const key in viewBox) {
          controls[`txtVb_${key}`].attr("value", parseInt(viewBox[key]));
        }
      }

      function collectViewBox(viewBox) {
        for (const key in viewBox) {
          const ctl = controls[`txtVb_${key}`];
          let num = parseInt(ctl.property("value"));
          if (isNaN(num)) {
            num = 0;
            ctl.property("value", 0);
          }
          viewBox[key] = num;
        }
      }

      function applyViewBoxToSvg(viewBox) {
        svgSetViewBox(diagram.select("svg"), viewBox);
      }

      function setViewBox() {
        collectViewBox(viewBox);
        applyViewBoxToSvg(viewBox);
      }

      function scaleViewBox(factor) {
        viewBox.width = parseInt(viewBox.width * factor);
        viewBox.height = parseInt(viewBox.height * factor);
        populateViewBoxInputs(viewBox);
        applyViewBoxToSvg(viewBox);
      }

      populateViewBoxInputs(origViewBox);

      controls.btnVbReset
        .on("click", () => {
          Object.assign(viewBox, origViewBox)
          populateViewBoxInputs(origViewBox);
          applyViewBoxToSvg(origViewBox);
        });

      controls.btnVbSmaller
        .on("click", () => scaleViewBox(1.1));

      controls.btnVbBigger
        .on("click", () => scaleViewBox(0.95));

      controls.btnVbWide
        .on("click", () => {
          viewBox.height = parseInt(viewBox.width * 9.0 / 16.0);
          populateViewBoxInputs(viewBox);
          applyViewBoxToSvg(viewBox);
        });

      for (const key in viewBox) {
        const ctl = controls[`txtVb_${key}`];
        ctl.on("change", setViewBox);
      }

      function btnVbCopyClicked() {
        const txt = [ viewBox.offsetX, viewBox.offsetY,
                      viewBox.width, viewBox.height ].join (" ");
        navigator.clipboard.writeText(txt);
      }

      navigator.permissions.query({ name: "clipboard-write" })
        .then((result) => {
          if (result.state == "granted" ||
              result.state == "prompt") {
            controls.btnJsonCopy.on("click", btnJsonCopyClicked);
            controls.btnVbCopy.on("click", btnVbCopyClicked);
          } else {
            controls.btnJsonCopy.attr("disabled", true);
            controls.btnVbCopy.attr("disabled", true);
          }
        });

      return editor;
    }

    function floatboxClose(floatbox, closeCB) {
      if (closeCB) {
        closeCB();
      }
      floatbox.style("display", "none");
    }

    function floatboxSetup(floatbox, closeCB) {
      floatbox.select("button.btn-close")
        .on("click", () => floatboxClose(floatbox, closeCB));

      const orig = { x: 0, y: 0 };

      function dragStart(event, datum) {
        orig.y = event.y - this.offsetTop;
        orig.x = event.x - this.offsetLeft;
        d3.select(this)
          .classed("drag", true);
      }

      function dragged(event, datum) {
        const top = event.y - orig.y;
        const left = event.x - orig.x;

        if (top < - (this.clientHeight / 2)) {
          return;
        }
        if (left < - (this.clientWidth / 2)) {
          return;
        }
        if (top > window.innerHeight - (this.clientHeight / 2)) {
          return;
        }
        if (left > window.innerWidth - (this.clientWidth / 2)) {
          return;
        }

        floatbox.style("top", top + "px");
        floatbox.style("left", left + "px");
      }

      function dragEnd(event) {
        d3.select(this)
          .classed("drag", false);
      }

      const drag = d3.drag()
            .on("start", dragStart)
            .on("drag", dragged)
            .on("end", dragEnd);

      floatbox.call(drag);

      return floatbox;
    }

    function legendShow(legend, active) {
      legend.style("display", (active)? "block": "none");
    }

    function legendSetup(legend, toolbar, classDescriptions) {
      const cont = legend.select(".cont");
      for (const desc of classDescriptions) {
        cont.append("div")
          .html(`<span class="figure textbox-box box-${desc.Code}"></span>${desc.Title}`);
      }

      const dotRadius = 20;
      const dots = [
        createNodeDot(dotRadius, false, false),
        createNodeDot(dotRadius, true, false),
        createNodeDot(dotRadius, false, true),
        createNodeDot(dotRadius, true, true)
      ];
      legend.selectAll(".legend-nodes > div")
        .each(function (datum, idx) {
          d3.select(this).insert("svg", ":first-child")
            .classed("figure", true)
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("viewBox", [-dotRadius - 5, -dotRadius - 5, dotRadius * 2 + 10, dotRadius * 2 + 10])
            .append(() => dots[idx]);
        });

      floatboxSetup(legend, () => {
        setCookie("show-legend", false);
        toolbar.select(".tool-legend").classed("active", false);
      });

      legendShow(legend, getCookie("show-legend"));
    }

    function nodeDragSetup(nodes, links, zoom, translateExtents) {
      function dragStart(event, datum) {
        d3.select(this)
          .classed("drag", true);
      }

      function dragNode(datum, deltaX, deltaY) {
        datum.x += deltaX;
        datum.y += deltaY;

        if (updateExtents(datum.x, datum.y, translateExtents)) {
          zoom.translateExtent(translateExtents);
        }
      }

      function dragged(event, datum) {
        const deltaX = event.x - datum.x;
        const deltaY = event.y - datum.y;

        if (datum.selected) {
          nodes.filter(".selected")
            .each((datum, idx) => dragNode(datum, deltaX, deltaY));
        } else {
          dragNode(datum, deltaX, deltaY);
        }

        forceTick(nodes, links);
      }

      function dragEnd(event) {
        d3.select(this)
          .classed("drag", false);
      }

      const drag = d3.drag()
            .on("start", dragStart)
            .on("drag", dragged)
            .on("end", dragEnd);

      return drag;
    }

    const fileDownload = (function() {
      const a = document.createElement('a');
      a.setAttribute('style', 'display: none');
      let appended = false;

      return function (blob, fname) {
        if (!appended) {
          appended = true;
          document.body.appendChild(a);
        }

        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fname;
        a.click();
        window.URL.revokeObjectURL(url);
      };
    })();

    function svgExportToBlob(svg) {
      const svg2 = svg.clone(true)
      const elems = svg2.selectAll("*");

      // we have to copy the style in two steps for perfomance
      elems.each(function() {
        if (this.tagName == 'svg' ||
            this.tagName == 'defs' ||
            this.tagName == 'linearGradient')
          return;

        const cs = window.getComputedStyle(this);
        const newStyle = document.createElement('div').style;
        for (prop of cs)
          newStyle.setProperty(prop, cs.getPropertyValue(prop))
        this.__mystyle = newStyle;
      });

      svg2.remove();

      // only set the styles once the element is not in the DOM
      elems.each(function() {
        if (!this.__mystyle)
          return
        const cs = this.__mystyle;
        for (prop of cs)
          this.style[prop] = cs.getPropertyValue(prop);
      });

      const blob = new Blob([svg2.node().outerHTML], { type: "image/svg+xml" });
      return blob;
    }

    function toolbarDownloadSvg(svg, fname) {
      const blob = svgExportToBlob(svg);
      fileDownload(blob, fname);
    }

    function toolbarDownloadPng(svg, fname) {
      const vb = parseViewBox(svg.attr("viewBox"));
      const blob = svgExportToBlob(svg);
      const svg_url = window.URL.createObjectURL(blob);
      const img = document.createElement('img');
      img.width = vb.width * 2;
      img.height = vb.height * 2;

      function img_on_load() {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const context = canvas.getContext("2d");
        context.drawImage(img, 0, 0);

        canvas.toBlob((blob) => fileDownload(blob, fname),
                     "image/png");
        window.URL.revokeObjectURL(svg_url);
      }

      img.addEventListener("load", img_on_load);
      img.src = svg_url;
    }

    function toolbarFullscreen(shell) {
      if (!document.fullscreenElement) {
        shell.node().requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }

    function toolbarFullscreenChange(shell, btn) {
      if (document.fullscreenElement) {
        shell.classed("fullscreen", true);
        btn.classed("bi-fullscreen", false);
        btn.classed("bi-fullscreen-exit active", true);
      } else {
        shell.classed("fullscreen", false);
        btn.classed("bi-fullscreen-exit active", false);
        btn.classed("bi-fullscreen", true);
      }
    }

    function toolbarSetup(shell, svg, zoom, legend, editor, config) {
      const toolbar = shell.select(".btn-toolbar");

      toolbar.selectAll(".btn[aria-label]")
        .on("mouseover.tooltip",
            (event) => d3.select(event.target).classed("hover", true))
        .on("mouseout.tooltip",
            (event) => d3.select(event.target).classed("hover", false))
        .on("click.tooltip",
            (event) => {
              const target = d3.select(event.target);
              target.classed("hover", true);
              window.setTimeout(() => target.classed("hover", false), 1000);
            }, 1000);

      toolbar.select(".tool-editor-group")
        .classed("d-none", !config.DEV_MODE);

      toolbar.select(".tool-editor")
        .classed("active", config.USE_EDITOR)
        .on("click", (event) => {
          const active = d3.select(event.target).classed("active");
          editorShow(editor, legend, active);
        });

      toolbar.select(".tool-download")
        .on("click", (event) => {
          const active = d3.select(event.target).classed("active");
          const tf2g = toolbar.select(".tool-file2-group");
          tf2g.classed("d-none", !active);
        });
      toolbar.select(".tool-download-svg")
        .on("click", () => toolbarDownloadSvg(svg, config.DIAGRAM + '.svg'));
      toolbar.select(".tool-download-png")
        .on("click", () => toolbarDownloadPng(svg, config.DIAGRAM + '.png'));

      toolbar.select(".tool-zoom-out")
        .on("click", () => svg.transition().call(zoom.scaleBy, 0.5));
      toolbar.select(".tool-zoom-reset")
        .on("click", () => svg.transition().call(zoom.transform, d3.zoomIdentity));
      toolbar.select(".tool-zoom-in")
        .on("click", () => svg.transition().call(zoom.scaleBy, 2));

      const fsbtn = toolbar.select(".tool-fullscreen")
            .on("click", () => toolbarFullscreen(shell));
      shell.on("fullscreenchange", () => toolbarFullscreenChange(shell, fsbtn));

      if (config.RETICLE_DISABLE) {
        toolbar.select(".tool-show-group").remove();
        toolbar.select(".tool-selection-group").remove();
        return toolbar;
      }

      toolbar.select(".tool-legend")
        .classed("active", getCookie("show-legend"))
        .on("click", (event) => {
          const active = d3.select(event.target).classed("active");
          setCookie("show-legend", active);
          legendShow(legend, active);
        });

      toolbar.select(".tool-attrs")
        .classed("active", getCookie("show-attributes"))
        .on("click", (event) => {
          const active = d3.select(event.target).classed("active");
          setCookie("show-attributes", active);
          attributesShow(svg, active);
        });

      toolbar.select(".tool-levels")
        .classed("active", getCookie("show-levels"))
        .on("click", (event) => {
          const active = d3.select(event.target).classed("active");
          setCookie("show-levels", active);
          levelsShow(svg, active);
        });

      return toolbar;
    }

    function toolbarSetup2(toolbar, nodes) {
      toolbar.select(".tool-selall")
        .on("click", () => nodes.each(function() { nodeSelect(d3.select(this), true); }));
      toolbar.select(".tool-selnone")
        .on("click", () => nodes.each(function() { nodeSelect(d3.select(this), false); }));
    }

    function parseViewBox(str) {
      const vb = str.split(/ *,? +/).map((v) => parseInt(v));
      return {
        offsetX: vb[0],
        offsetY: vb[1],
        width:   vb[2],
        height:  vb[3]
      }
    }

    function updateExtents(x, y, extents) {
      const margin = 100;
      let changed = false;

      if (x < extents[0][0]) {
        extents[0][0] = x - margin;
        changed = true;
      } else if (x > extents[1][0]) {
        extents[1][0] = x + margin;
        changed = true;
      }

      if (y < extents[0][1]) {
        extents[0][1] = y - margin;
        changed = true;
      } else if (y > extents[1][1]) {
        extents[1][1] = y + margin;
        changed = true;
      }

      return changed;
    }

    const char2ent = {
      " ": "",
      "*": "ast",
      "=": "eq",
      "≠": "ne"
    }
    function getAttrId(attr) {
      return attr
        .replace(/&#[0-9]+;|&#x[0-9a-fA-F]+;|&[0-9a-zA-Z]{2,};|./gu, (m) => {
          if (m.length >= 4 && m[0] === "&") {
            return m.substr(1, m.length - 2);
          }
          if (m.length === 1) {
            if (char2ent[m] !== undefined) {
              return char2ent[m] + "-";
            }
            if (m.match(/[a-zA-Z0-9\s\t\n\r~`!@#$%^&_+(){}[\]/\\,?:;|.-]/)) {
              return m;
            }
          }
          return `${m.codePointAt(0)}-`;
        })
        .replace(/[^-a-zA-Z0-9]/g, "")
        .replace(/-+/g, "-")
        .replace(/-$/g, "");
    }

    function eventStop(event) {
      event.stopPropagation();
    }

    function attributesShow(svg, active) {
      svg.classed("no-attributes", !active);
    }

    function levelsShow(svg, active) {
      svg.classed("show-levels", !!active);
    }

    this.main = function() {
      configSetup(this.config);

      const elements = elementsSetup(this.config);

      const d1 = elements.d1;
      const svg = elements.svg;
      const root_group = elements.root_group;
      const infobox = elements.infobox;

      svg.attr("viewBox", this.config.VIEWBOX);
      root_group.attr("transform", d3.zoomIdentity);

      const viewBox = parseViewBox(this.config.VIEWBOX);
      const translateExtents = [[-viewBox.width / 4, -viewBox.height / 4],
                                [viewBox.width * 1.5, viewBox.height * 1.5]];

      const zoom = d3.zoom()
            .translateExtent(translateExtents)
            .scaleExtent([0.0625, 32])
            .on("zoom", ({transform}) => root_group.attr("transform", transform));
      svg.call(zoom)
        .on("dblclick.zoom", null)
        .on("wheel.zoom", null);

      const legend = d3.select("#legend");
      const editor = d3.select("#editor");
      const toolbar = toolbarSetup(d3.select(d1.node().parentNode), svg, zoom, legend, editor, this.config);

      if (this.config.RETICLE_DISABLE) {
        legendShow(legend, false);
        if (this.config.USE_EDITOR || this.config.DEV_MODE) {
          editorSetup(editor, d1, legend, undefined, viewBox, this.config);
        }
        return;
      }

      let nodes = root_group.selectAll(".node");
      let links = root_group.selectAll(".link");

      svg.on("click", (event) => svgClick(event, nodes, links));

      const force = d3.forceSimulation()
            .force("link", d3.forceLink()
                   .distance(calcDistance)
                   .strength(this.config.LINK_STRENGTH))
            .force("x", d3.forceX(1).strength(0))
            .force("y", d3.forceY(1).strength(0))
            .velocityDecay(0.5)
            .on("tick", () => forceTick(nodes, links));

      const attrClasses = {};
      const that = this;
      function descCsvLoaded(data, attrDesc) {
        const check = new Map();
        for (const desc of data) {
          const attr_id = getAttrId(desc.Attribute);
          if (check.has(attr_id)) {
            console.warn("Colission between " + check.get(attr_id) + " and " +
                         desc.Attribute + ". attr_id: " + attr_id);
            continue;
          }
          check.set(attr_id, desc.Attribute);

          desc.Explanation = '<p>' + desc.Explanation.replaceAll('<br>', '</p><p>') + '</p>';
          attrDesc.append("div")
            .attr("id", "attr-desc-" + attr_id)
            .html('<span class="attr-desc-title">' + desc.Title + '</span>' +
                  '<span class="attr-desc-formula">' + desc.Formula + '</span>' +
                  '<span class="attr-desc-exp">' + desc.Explanation + '</span>' +
                  '<span class="attr-desc-ref">' + desc.Reference + '</span>');
          attrClasses[desc.Attribute] = desc.Class;
        }
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, attrDesc.node()]);
        d3.json(that.config.POS_SOURCE).then((nodePos) =>
          d3.json(that.config.LATTICE_SOURCE).then((graph) => latticeJsonLoaded(graph, nodePos)));
      }

      d3.dsv("|", this.config.ATTR_CLASS_DESC_SOURCE)
        .then((data) => legendSetup(legend, toolbar, data));

      d3.dsv("|", this.config.ATTR_DESC_SOURCE)
        .then((data) => descCsvLoaded(data, d3.select("#attr-desc")));

      function latticeJsonLoaded(graph, nodePos) {
        graph.classes = attrClasses;
        mergeNodePos(graph.nodes, nodePos);

        if (that.config.USE_EDITOR || that.config.DEV_MODE) {
          editorSetup(editor, d1, legend, graph, viewBox, that.config);
        }

        force
          .nodes(graph.nodes)
          .force("link").links(graph.links);
        window.setTimeout(() => force.stop(), 100);

        links = links.data(graph.links)
          .enter().append(createLink);

        nodes = nodes.data(graph.nodes)
          .enter().append(createNode)
          .on("click", (event, datum) => nodeClick(event, datum, graph, nodes, links))
          .on("dblclick", nodeDblclick);

        nodes.call(nodeDragSetup(nodes, links, zoom, translateExtents));

        toolbarSetup2(toolbar, nodes);

        function observeForBBox(textBoxes) {
          const observer = new MutationObserver(
            (mutations) => {
              for (let i = 0; i < textBoxes.length; i++) {
                const tb = textBoxes[i];
                if (document.contains(tb.node())) {
                  textBoxSetBBox(tb, that.config);
                  textBoxes.splice(i, 1);
                  if (textBoxes.length == 0) {
                    observer.disconnect();
                    return;
                  }
                  i--;
                }
              }
            }
          );
          observer.observe(document,
                           {attributes: false, childList: true, characterData: false, subtree: true});
        }

        function createNode(datum) {
          const group = d3.select(document.createElementNS(d3.namespaces.svg, "g"))
                .classed("node", true)
                .attr("hash", datum.hash);

          if (datum.level == 0) {
            group.classed("infimum", true);
          }

          const hasAttributes = datum.labelAttributes.length > 0;
          const hasLabelObjects = datum.labelObjects.length > 0;

          group.append(() => createNodeDot(that.config.NODE_RADIUS, hasAttributes, hasLabelObjects))
            .datum(datum);

          const lvl_text = group.append("text")
                .classed("node-level", true)
                .attr("text-anchor", "middle")
                .text(datum.level);
          levelTextSetPos(lvl_text, that.config);

          if (hasAttributes) {
            const textBoxes = [];
            const numAttributes = datum.labelAttributes.length;
            const column2 = (numAttributes > ATTRIBUTES_TO_DOUBLE_COLUMN_AFTER)?
                  numAttributes / 2 - 1:
                  numAttributes;
            let anchor;
            for (let i = 0; i < numAttributes; i++) {
              if (i > column2 && anchor === undefined) {
                anchor = "end";
              }
              const attr = datum.labelAttributes[i];

              const attr_id = getAttrId(attr);
              const expNode = d3.select("#attr-desc-" + attr_id + " .attr-desc-exp");
              let eleClass = "box-" + graph.classes[attr];
              let exp = "";
              if (!expNode.empty()) {
                exp = expNode.html();
                eleClass += " hasexp";
              }
              eleClass += " attributes-label";

              const textBox = group
                    .append(() => createTextBox(eleClass, attr, anchor))
                    .on("click", (event) => attributeClick(event, infobox))
                    .property("attribute", attr);

              textBoxes.push(textBox);
            }
            nodeAttributesSetPos(group, that.config);
            observeForBBox(textBoxes);
          }

          if (hasLabelObjects) {
            const textBoxes = [];
            for (let i = 0; i < datum.labelObjects.length; i++) {
              const id = datum.labelObjects[i];
              const textBox = group.append(() => createTextBox("objects-label",
                                                               graph.context[id].name));
              textBoxes.push(textBox);
            }
            nodeObjectLabelsSetPos(group, that.config);
            observeForBBox(textBoxes);
          }

          return group.node();
        }
      }
    }
  }

  window.Reticulo = new reticulo();
} ());
