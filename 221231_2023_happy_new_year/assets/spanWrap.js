class SpanWrap {
  constructor() {
    this.settings = {
      target: ".js-span-wrap-text" };

    this.targets = "";
    this.targetLength = 0;
    this.nodes = [];
    this.convertContents = [];
  }

  init(options) {
    this.setup(options);
    this.getNodes();
    this.convert();
    this.set();
  }

  setup(options) {
    this.settings = Object.assign({
      target: this.settings.target },
    options || {});
    this.targets = document.querySelectorAll(this.settings.target);
    this.targetLength = this.targets.length;
  }

  getNodes() {
    for (let target of this.targets) {
      let nodes = target.childNodes;
      this.nodes.push(nodes);
    }
  }

  convert() {
    for (let i = 0; i < this.targetLength; i++) {
      this.convertContents.push([]); //カラの配列を追加
      for (let node of this.nodes[i]) {
        if (node.nodeType == 3) {//テキストの場合
          //let text = node.textContent.replace(/\s+/g, '');//テキストから空白削除
          let text = node.textContent;
          text.split('').forEach(v => {
            this.convertContents[i].push("<span>" + v + "</span>");
          });

        } else {//テキスト以外
          this.convertContents[i].push(node.outerHTML);
        }
      }
    }
  }

  set() {
    for (let i = 0; i < this.targetLength; i++) {
      this.targets[i].innerHTML = this.convertContents[i].join("");
    }
  }}

window.addEventListener('load', event => {
  const spanWrap = new SpanWrap();
  spanWrap.init();
});

