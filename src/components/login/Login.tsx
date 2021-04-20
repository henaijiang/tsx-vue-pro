import { Component, Vue } from "vue-property-decorator";
import { Form, FormItem, Input, Button } from "element-ui";
// import { userServer } from "../../server";
import "./login.scss";

@Component
export default class Login extends Vue {
  /**账号密码 */
  userInfo: {
    name: string;
    password: string;
  } = {
    name: "",
    password: ""
  };
  isLogin: boolean = false;
  rules = {
    name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }]
  };
  /**登录 */
  async login() {
    const vm = this;
    vm.$refs.login.validate(async valid => {
      if (valid) {
        // const res = await userServer.login(vm.userInfo);
        // if (res.success) {
        //   vm.$message.success(res.data);
        //   vm.$router.push({ path: "/main" });
        // } else {
        //   vm.$message.error(res.data);
        // }
        vm.isLogin = true;
        setTimeout(() => {
          vm.isLogin = false;
          sessionStorage.setItem("loginUser", vm.userInfo.name);
          vm.$router.push({ path: "/main" });
        }, 1500);
      }
    });
  }
  /**重置 */
  resetForm() {
    this.$refs.login.resetFields();
  }
  $refs!: {
    login: Form;
  };
  render() {
    const vm = this;
    return (
      <Form
        class="user-login"
        ref="login"
        {...{ props: { model: vm.userInfo } }}
        rules={vm.rules}
      >
        <FormItem label="账号" prop="name">
          <Input vModel={vm.userInfo.name}></Input>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input type="password" vModel={vm.userInfo.password}></Input>
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            on-click={vm.login}
            loading={vm.isLogin}
            disabled={vm.isLogin}
          >
            {vm.isLogin ? "登录中" : "登录"}
          </Button>
          <Button on-click={vm.resetForm} disabled={vm.isLogin}>
            重置
          </Button>
        </FormItem>
      </Form>
    );
  }
}
