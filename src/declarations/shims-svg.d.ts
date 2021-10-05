declare module '*.svg?inline' {
  import Vue, {VueConstructor} from 'vue';
  const content: VueConstructor<Vue>;
  export default content;
}

declare module "*.svg" {
  const value: string;
  export default value;
}