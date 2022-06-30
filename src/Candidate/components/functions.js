export function addcl() {
  let parent = this.parentNode.parentNode;
  parent.classList.add("focus");
}
export function remcl() {
  let parent = this.parentNode.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}
