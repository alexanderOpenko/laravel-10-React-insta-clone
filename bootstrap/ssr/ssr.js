import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { forwardRef, useRef, useEffect, useState, Fragment as Fragment$1, createContext, useContext } from "react";
import { Link, useForm, Head, usePage, useRemember, createInertiaApp } from "@inertiajs/react";
import { Transition, Dialog } from "@headlessui/react";
import axios from "axios";
import dayjs from "dayjs";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
import route$1 from "ziggy-js";
function ApplicationLogo(props) {
  return /* @__PURE__ */ jsx("svg", { ...props, viewBox: "0 0 316 316", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { d: "M305.8 81.125C305.77 80.995 305.69 80.885 305.65 80.755C305.56 80.525 305.49 80.285 305.37 80.075C305.29 79.935 305.17 79.815 305.07 79.685C304.94 79.515 304.83 79.325 304.68 79.175C304.55 79.045 304.39 78.955 304.25 78.845C304.09 78.715 303.95 78.575 303.77 78.475L251.32 48.275C249.97 47.495 248.31 47.495 246.96 48.275L194.51 78.475C194.33 78.575 194.19 78.725 194.03 78.845C193.89 78.955 193.73 79.045 193.6 79.175C193.45 79.325 193.34 79.515 193.21 79.685C193.11 79.815 192.99 79.935 192.91 80.075C192.79 80.285 192.71 80.525 192.63 80.755C192.58 80.875 192.51 80.995 192.48 81.125C192.38 81.495 192.33 81.875 192.33 82.265V139.625L148.62 164.795V52.575C148.62 52.185 148.57 51.805 148.47 51.435C148.44 51.305 148.36 51.195 148.32 51.065C148.23 50.835 148.16 50.595 148.04 50.385C147.96 50.245 147.84 50.125 147.74 49.995C147.61 49.825 147.5 49.635 147.35 49.485C147.22 49.355 147.06 49.265 146.92 49.155C146.76 49.025 146.62 48.885 146.44 48.785L93.99 18.585C92.64 17.805 90.98 17.805 89.63 18.585L37.18 48.785C37 48.885 36.86 49.035 36.7 49.155C36.56 49.265 36.4 49.355 36.27 49.485C36.12 49.635 36.01 49.825 35.88 49.995C35.78 50.125 35.66 50.245 35.58 50.385C35.46 50.595 35.38 50.835 35.3 51.065C35.25 51.185 35.18 51.305 35.15 51.435C35.05 51.805 35 52.185 35 52.575V232.235C35 233.795 35.84 235.245 37.19 236.025L142.1 296.425C142.33 296.555 142.58 296.635 142.82 296.725C142.93 296.765 143.04 296.835 143.16 296.865C143.53 296.965 143.9 297.015 144.28 297.015C144.66 297.015 145.03 296.965 145.4 296.865C145.5 296.835 145.59 296.775 145.69 296.745C145.95 296.655 146.21 296.565 146.45 296.435L251.36 236.035C252.72 235.255 253.55 233.815 253.55 232.245V174.885L303.81 145.945C305.17 145.165 306 143.725 306 142.155V82.265C305.95 81.875 305.89 81.495 305.8 81.125ZM144.2 227.205L100.57 202.515L146.39 176.135L196.66 147.195L240.33 172.335L208.29 190.625L144.2 227.205ZM244.75 114.995V164.795L226.39 154.225L201.03 139.625V89.825L219.39 100.395L244.75 114.995ZM249.12 57.105L292.81 82.265L249.12 107.425L205.43 82.265L249.12 57.105ZM114.49 184.425L96.13 194.995V85.305L121.49 70.705L139.85 60.135V169.815L114.49 184.425ZM91.76 27.425L135.45 52.585L91.76 77.745L48.07 52.585L91.76 27.425ZM43.67 60.135L62.03 70.705L87.39 85.305V202.545V202.555V202.565C87.39 202.735 87.44 202.895 87.46 203.055C87.49 203.265 87.49 203.485 87.55 203.695V203.705C87.6 203.875 87.69 204.035 87.76 204.195C87.84 204.375 87.89 204.575 87.99 204.745C87.99 204.745 87.99 204.755 88 204.755C88.09 204.905 88.22 205.035 88.33 205.175C88.45 205.335 88.55 205.495 88.69 205.635L88.7 205.645C88.82 205.765 88.98 205.855 89.12 205.965C89.28 206.085 89.42 206.225 89.59 206.325C89.6 206.325 89.6 206.325 89.61 206.335C89.62 206.335 89.62 206.345 89.63 206.345L139.87 234.775V285.065L43.67 229.705V60.135ZM244.75 229.705L148.58 285.075V234.775L219.8 194.115L244.75 179.875V229.705ZM297.2 139.625L253.49 164.795V114.995L278.85 100.395L297.21 89.825V139.625H297.2Z" }) });
}
function Guest({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100", children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx(ApplicationLogo, { className: "w-20 h-20 fill-current text-gray-500" }) }) }),
    /* @__PURE__ */ jsx("div", { className: "w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg", children })
  ] });
}
function InputError({ message, className = "", ...props }) {
  return message ? /* @__PURE__ */ jsx("p", { ...props, className: "text-sm text-red-600 " + className, children: message }) : null;
}
function InputLabel({ value, className = "", children, ...props }) {
  return /* @__PURE__ */ jsx("label", { ...props, className: `block font-medium text-sm text-gray-700 ` + className, children: value ? value : children });
}
function PrimaryButton({ className = "", disabled, children, ...props }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      className: `inline-flex cursor-pointer items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
const TextInput = forwardRef(function TextInput2({ type = "text", className = "", isFocused = false, ...props }, ref) {
  const input = ref ? ref : useRef();
  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      type,
      className: "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm " + className,
      ref: input
    }
  );
});
function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: ""
  });
  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);
  const submit = (e) => {
    e.preventDefault();
    post(route("password.confirm"));
  };
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Confirm Password" }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600", children: "This is a secure area of the application. Please confirm your password before continuing." }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "mt-1 block w-full",
            isFocused: true,
            onChange: (e) => setData("password", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end mt-4", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Confirm" }) })
    ] })
  ] });
}
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ConfirmPassword
}, Symbol.toStringTag, { value: "Module" }));
function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("password.email"));
  };
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Forgot Password" }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600", children: "Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one." }),
    status && /* @__PURE__ */ jsx("div", { className: "mb-4 font-medium text-sm text-green-600", children: status }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsx(
        TextInput,
        {
          id: "email",
          type: "email",
          name: "email",
          value: data.email,
          className: "mt-1 block w-full",
          isFocused: true,
          onChange: (e) => setData("email", e.target.value)
        }
      ),
      /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end mt-4", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Email Password Reset Link" }) })
    ] })
  ] });
}
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ForgotPassword
}, Symbol.toStringTag, { value: "Module" }));
function Checkbox({ className = "", ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      type: "checkbox",
      className: "rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 " + className
    }
  );
}
function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false
  });
  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);
  const submit = (e) => {
    e.preventDefault();
    post(route("login"));
  };
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Log in" }),
    status && /* @__PURE__ */ jsx("div", { className: "mb-4 font-medium text-sm text-green-600", children: status }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            name: "email",
            value: data.email,
            className: "mt-1 block w-full",
            autoComplete: "username",
            isFocused: true,
            onChange: (e) => setData("email", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "mt-1 block w-full",
            autoComplete: "current-password",
            onChange: (e) => setData("password", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "block mt-4", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(
          Checkbox,
          {
            name: "remember",
            checked: data.remember,
            onChange: (e) => setData("remember", e.target.checked)
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "ms-2 text-sm text-gray-600", children: "Remember me" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end mt-4", children: [
        canResetPassword && /* @__PURE__ */ jsx(
          Link,
          {
            href: route("password.request"),
            className: "underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
            children: "Forgot your password?"
          }
        ),
        /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Log in" })
      ] })
    ] })
  ] });
}
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Login
}, Symbol.toStringTag, { value: "Module" }));
function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);
  const submit = (e) => {
    e.preventDefault();
    post(route("register"));
  };
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Register" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Name" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "name",
            name: "name",
            value: data.name,
            className: "mt-1 block w-full",
            autoComplete: "name",
            isFocused: true,
            onChange: (e) => setData("name", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            name: "email",
            value: data.email,
            className: "mt-1 block w-full",
            autoComplete: "username",
            onChange: (e) => setData("email", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            onChange: (e) => setData("password", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password_confirmation", value: "Confirm Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password_confirmation",
            type: "password",
            name: "password_confirmation",
            value: data.password_confirmation,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            onChange: (e) => setData("password_confirmation", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password_confirmation, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end mt-4", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("login"),
            className: "underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
            children: "Already registered?"
          }
        ),
        /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Register" })
      ] })
    ] })
  ] });
}
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Register
}, Symbol.toStringTag, { value: "Module" }));
function ResetPassword({ token, email }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token,
    email,
    password: "",
    password_confirmation: ""
  });
  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);
  const submit = (e) => {
    e.preventDefault();
    post(route("password.store"));
  };
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Reset Password" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            name: "email",
            value: data.email,
            className: "mt-1 block w-full",
            autoComplete: "username",
            onChange: (e) => setData("email", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            isFocused: true,
            onChange: (e) => setData("password", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password_confirmation", value: "Confirm Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            type: "password",
            name: "password_confirmation",
            value: data.password_confirmation,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            onChange: (e) => setData("password_confirmation", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password_confirmation, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end mt-4", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Reset Password" }) })
    ] })
  ] });
}
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ResetPassword
}, Symbol.toStringTag, { value: "Module" }));
function VerifyEmail({ status }) {
  const { post, processing } = useForm({});
  const submit = (e) => {
    e.preventDefault();
    post(route("verification.send"));
  };
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Email Verification" }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600", children: "Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another." }),
    status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mb-4 font-medium text-sm text-green-600", children: "A new verification link has been sent to the email address you provided during registration." }),
    /* @__PURE__ */ jsx("form", { onSubmit: submit, children: /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Resend Verification Email" }),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: route("logout"),
          method: "post",
          as: "button",
          className: "underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
          children: "Log Out"
        }
      )
    ] }) })
  ] });
}
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: VerifyEmail
}, Symbol.toStringTag, { value: "Module" }));
function ChatInput({ receiver, getLastChat }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    message: ""
  });
  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value);
  };
  const submit = (e) => {
    e.preventDefault();
    post(route("chat.store", receiver == null ? void 0 : receiver.id), {
      onSuccess: () => getLastChat()
    });
    reset("message");
  };
  return /* @__PURE__ */ jsx("div", { className: "w-full bg-white pl-4", children: /* @__PURE__ */ jsx("form", { onSubmit: submit, children: /* @__PURE__ */ jsx(
    TextInput,
    {
      className: "h-16 w-full overflow-y-auto bg-white pt-3 font-light border-0 hover:border-0 focus:border-0 focus:ring-0 !shadow-none focus:!outline-none",
      placeholder: "Write a message",
      name: "message",
      value: data.message,
      onChange: onHandleChange
    }
  ) }) });
}
function strPlural(string, n) {
  const suffixes = /* @__PURE__ */ new Map([
    ["one", `${string}`],
    ["other", `${string}s`]
  ]);
  const rule = new Intl.PluralRules("en-US").select(n);
  const suffix = suffixes.get(rule);
  return `${n} ${suffix}`;
}
const appURL$2 = "http://127.0.0.1:8000";
function ChatMessages({ receiver, messages: data, auth_id }) {
  const chatContainerRef = useRef(null);
  const [messages, setMessages] = useState(data);
  const [readedMesages, setReadedMessages] = useState(false);
  const isReceivedMessage = (message) => {
    return message.receiver_id === auth_id;
  };
  const getLastMessage = async () => {
    if (!receiver) {
      return;
    }
    const resp = await fetch(`${appURL$2}/chat/lastMessage/${receiver.id}`);
    const json = await resp.json();
    if (json.sender_id === auth_id) {
      setReadedMessages(false);
    }
    setMessages((prevMessages) => [...prevMessages, json]);
    chatContainerRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  };
  useEffect(() => {
    const sortedUserIds = [auth_id, receiver == null ? void 0 : receiver.id].sort();
    const roomId = sortedUserIds.join("");
    Echo.private(`messagereaded.${auth_id}`).listen("MessageReaded", (e) => {
      setReadedMessages(true);
    });
    Echo.join(`messenger.${roomId}`).listen("MessageSent", (e) => {
      getLastMessage();
    }).here((users) => {
      console.log(users, "users");
    }).joining((user) => {
      console.log(user.name, "user.name");
    }).leaving((user) => {
      console.log(user.name, "user.name");
    }).error((error) => {
      console.error(error);
    });
    return () => {
      Echo.leave(`messenger.${roomId}`);
      Echo.leave(`messagereaded.${auth_id}`);
    };
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    (messages || []).map((message, index) => {
      const isReceived = isReceivedMessage(message);
      return /* @__PURE__ */ jsx(Fragment$1, { children: /* @__PURE__ */ jsx(
        "div",
        {
          className: `${isReceived ? "receive-chat justify-start" : "send-chat justify-end"} relative flex`,
          children: /* @__PURE__ */ jsx(
            "div",
            {
              className: `mb-2 max-w-[80%] rounded ${isReceived ? "bg-violet-400" : "bg-violet-200"} p-2 text-sm ${isReceived ? "text-white" : "text-slate-500"}`,
              children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx("p", { className: "mr-2", children: message == null ? void 0 : message.message }),
                !isReceived && (message.status ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx("i", { className: "fa fa-check", "aria-hidden": "true" }),
                  /* @__PURE__ */ jsx("i", { className: "fa fa-check", "aria-hidden": "true" })
                ] }) : !readedMesages && /* @__PURE__ */ jsx("i", { class: "fa fa-check", "aria-hidden": "true" })),
                !isReceived && (readedMesages && !message.status ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx("i", { className: "fa fa-check", "aria-hidden": "true" }),
                  /* @__PURE__ */ jsx("i", { className: "fa fa-check", "aria-hidden": "true" })
                ] }) : "")
              ] })
            }
          )
        }
      ) }, index);
    }),
    /* @__PURE__ */ jsx("div", { ref: chatContainerRef })
  ] });
}
function Avatar({ divClassName = "", imgClassName = "", size, user }) {
  const { public_url } = usePage().props;
  const sizeClass = {
    lg: "avatar-lg",
    sm: "avatar-sm",
    xsm: "avatar-xsm"
  }[size];
  const imgSrc = user.avatar ? public_url + "/" + user.avatar.avatar : public_url + "/avatar_placeholder.jpg";
  return /* @__PURE__ */ jsx("div", { className: `cursor-pointer flex ${sizeClass} ${divClassName}`, children: /* @__PURE__ */ jsx(
    "img",
    {
      className: "object-cover rounded-full" + imgClassName,
      src: imgSrc
    }
  ) });
}
function ChatSidebar({ recentMessages, receiverId, auth_id }) {
  return /* @__PURE__ */ jsx("div", { className: "user-list overflow-y-auto", children: recentMessages.map((el, index) => /* @__PURE__ */ jsxs(
    Link,
    {
      href: `/chat/${el.user.id}`,
      className: "flex px-5 py-3 transition hover:cursor-pointer hover:bg-slate-100",
      children: [
        /* @__PURE__ */ jsx("div", { className: "pr-4", children: /* @__PURE__ */ jsx(Avatar, { user: el.user, size: "sm" }) }),
        /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-md text-violet-500", children: el.user.name }),
            !!el.user.online && /* @__PURE__ */ jsx("div", { className: "rounded-full ml-2 bg-cyan-500 p-1 h-1/2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("p", { className: !el.message.status && auth_id !== el.message.sender_id ? "font-bold h-5 overflow-hidden text-sm" : "h-5 overflow-hidden text-sm font-light text-gray-400", children: el.message.message }),
            !el.message.status && auth_id !== el.message.sender_id && /* @__PURE__ */ jsx("div", { className: "rounded-full bg-cyan-500 px-2 text-white", children: "new" })
          ] })
        ] })
      ]
    },
    index
  )) });
}
function ChatUserInfoHeader({ receiver }) {
  return /* @__PURE__ */ jsx("div", { className: "user-info-header bg-white px-5 py-3", children: /* @__PURE__ */ jsx("div", { className: "flex justify-between", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
    /* @__PURE__ */ jsx(Avatar, { user: receiver, size: "sm" }),
    /* @__PURE__ */ jsx("h3", { className: "text-md pl-4 text-gray-400", children: receiver == null ? void 0 : receiver.name })
  ] }) }) });
}
const MenuItem = ({ children }) => {
  return /* @__PURE__ */ jsx("div", { className: "flex items-center font-medium py-4 cursor-pointer", children });
};
function BaseNav() {
  const { new_messeges } = usePage().props;
  const [newMessages, setNewMessages] = useState(new_messeges);
  const { auth } = usePage().props;
  useEffect(() => {
    Echo.private(`chatmessages.${auth.user.id}`).listen("ChatMessageSent", (e) => {
      setNewMessages(true);
    });
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "py-8 px-6 max-w-16 border-r w-full h-dvh", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-semibold text-2xl mb-7", children: "Chatter" }),
    /* @__PURE__ */ jsxs("nav", { className: "w-full h-full flex flex-col", children: [
      /* @__PURE__ */ jsxs(MenuItem, { children: [
        /* @__PURE__ */ jsx("i", { className: "fa fa-home mr-3 autowidth", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx(Link, { children: "Home" })
      ] }),
      /* @__PURE__ */ jsxs(MenuItem, { children: [
        /* @__PURE__ */ jsx("i", { className: "fa fa-user mr-3 autowidth", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx(Link, { children: "Users" })
      ] }),
      /* @__PURE__ */ jsxs(MenuItem, { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex mr-3 relative", children: [
          /* @__PURE__ */ jsx("i", { className: "fa fa-inbox autowidth", "aria-hidden": "true" }),
          newMessages && typeof window !== "undefined" && !window.location.pathname.includes("/chat") && /* @__PURE__ */ jsx("div", { className: "rounded-full h-[15px] w-[15px] bg-red-500 absolute top-[-6px] right-[-4px]" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx(Link, { href: route("chat.index"), children: "Messages" }) })
      ] }),
      /* @__PURE__ */ jsxs(MenuItem, { children: [
        /* @__PURE__ */ jsx("i", { className: "fa fa-bell mr-3 autowidth", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx(Link, { children: "Notifications" })
      ] }),
      /* @__PURE__ */ jsxs(MenuItem, { children: [
        /* @__PURE__ */ jsx(Avatar, { user: auth.user, size: "xsm", divClassName: "mr-3" }),
        /* @__PURE__ */ jsx(Link, { href: route("profile.show", auth.user.id), children: "Profile" })
      ] })
    ] })
  ] });
}
function Authenticated({ user, auth, header, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
    !auth.user && /* @__PURE__ */ jsx("header", { className: "bg-white shadow", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(ApplicationLogo, { className: "w-20 h-20 fill-current text-gray-500" }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex space-x-4", children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(PrimaryButton, { children: /* @__PURE__ */ jsx(Link, { href: route("login"), children: "Log In" }) }) }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(PrimaryButton, { children: /* @__PURE__ */ jsx(Link, { href: route("register"), children: "Sign Up" }) }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsxs("div", { className: !!auth.user && "flex", children: [
      !!auth.user && /* @__PURE__ */ jsx(BaseNav, {}),
      /* @__PURE__ */ jsx("div", { className: "w-full", children })
    ] }) })
  ] });
}
function Chat(props) {
  var _a;
  const { auth, errors, recentMessages: chatsList, receiver, messages } = props;
  const [chats, setChats] = useState([]);
  const getLastChat = async (userId = receiver.id) => {
    const resp = await fetch(`${appURL$2}/chat/lastChat/${userId}`);
    const json = await resp.json();
    setChats(
      (prevChats) => {
        const newChats = prevChats.filter((chat) => json.user.id !== chat.user.id);
        return [json, ...newChats];
      }
    );
  };
  const getUpdatedChats = async () => {
    const resp = await fetch(`${appURL$2}/chatList`);
    const json = await resp.json();
    setChats(json);
  };
  useEffect(() => {
    setChats(chatsList);
    Echo.private(`chatmessages.${auth.user.id}`).listen("ChatMessageSent", (e) => {
      getLastChat(e.user_id);
    });
    const intervalId = setInterval(() => {
      getUpdatedChats();
    }, 18e4);
    return () => {
      clearInterval(intervalId);
      Echo.leave(`chatmessages.${auth.user.id}`);
    };
  }, [chatsList]);
  return /* @__PURE__ */ jsx(Authenticated, { auth, errors, children: /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx("div", { className: "messanger overflow-hidden p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex", children: [
    /* @__PURE__ */ jsx("div", { className: "basis-2/6 border-r border-slate-100 bg-white pt-3", children: /* @__PURE__ */ jsx(
      ChatSidebar,
      {
        recentMessages: chats,
        receiverId: receiver == null ? void 0 : receiver.id,
        auth_id: auth.user.id
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "basis-4/6", children: (receiver == null ? void 0 : receiver.id) ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(ChatUserInfoHeader, { receiver }),
      /* @__PURE__ */ jsx("div", { className: "messanger mt-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", style: { maxHeight: "calc(100vh - 180px)" }, children: [
        /* @__PURE__ */ jsx("div", { className: "px-4 overflow-y-auto w-full", children: /* @__PURE__ */ jsx(
          ChatMessages,
          {
            receiver,
            messages,
            auth_id: (_a = auth == null ? void 0 : auth.user) == null ? void 0 : _a.id
          }
        ) }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(ChatInput, { receiver, getLastChat }) })
      ] }) })
    ] }) : /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center bg-slate-100 h-screen", children: /* @__PURE__ */ jsx("p", { className: "font-bold text-3xl text-gray-500", children: "Please select a User to start chatting..." }) }) })
  ] }) }) }) });
}
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Chat
}, Symbol.toStringTag, { value: "Module" }));
function Modal({ children, show = false, maxWidth = "2xl", closeable = true, onClose = () => {
} }) {
  const close = () => {
    if (closeable) {
      onClose();
    }
  };
  const maxWidthClass = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl"
  }[maxWidth];
  return /* @__PURE__ */ jsx(Transition, { show, as: Fragment$1, leave: "duration-200", children: /* @__PURE__ */ jsxs(
    Dialog,
    {
      as: "div",
      id: "modal",
      className: "fixed inset-0 flex overflow-y-auto px-5 py-8 items-center z-50 transform transition-all",
      onClose: close,
      children: [
        /* @__PURE__ */ jsx(
          Transition.Child,
          {
            as: Fragment$1,
            enter: "ease-out duration-300",
            enterFrom: "opacity-0",
            enterTo: "opacity-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gray-500/75" })
          }
        ),
        /* @__PURE__ */ jsx(
          Transition.Child,
          {
            as: Fragment$1,
            enter: "ease-out duration-300",
            enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            enterTo: "opacity-100 translate-y-0 sm:scale-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
            leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            children: /* @__PURE__ */ jsx(
              Dialog.Panel,
              {
                className: `max-h-148 items-center bg-white rounded-lg overflow-hidden shadow-xl
                         transform transition-all sm:w-full sm:mx-auto ${maxWidthClass}

                         `,
                children
              }
            )
          }
        )
      ]
    }
  ) });
}
function TransparentButton({ className = "", disableAutofocus = false, disabled, children, ...props }) {
  const deleteButton = useRef(null);
  const removeFocus = () => {
    disableAutofocus && deleteButton.current.blur();
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      className: `bg-transparent font-semibold border-none ${disabled && "opacity-25"} ` + className,
      ref: deleteButton,
      onFocus: removeFocus,
      disabled,
      children
    }
  );
}
const UseInfiniteScroll = ({ request, nextPageUrl, children }) => {
  let usedUrls = [];
  const scrollRef = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      scrollRef.current;
      const scrollTop = Math.round(children ? target.scrollTop : window.scrollY);
      const scrollHeight = children ? target.scrollHeight : document.body.scrollHeight;
      const clientHeight = children ? target.clientHeight : window.innerHeight;
      if (scrollTop + clientHeight >= scrollHeight - 50 && !usedUrls.includes(nextPageUrl)) {
        console.log("tut");
        if (nextPageUrl) {
          console.log(nextPageUrl, "nextPageUrll");
          request(nextPageUrl);
          usedUrls.push(nextPageUrl);
        }
      }
    };
    const target = children ? scrollRef.current : document;
    target.addEventListener("scroll", onScroll);
    return () => {
      target.removeEventListener("scroll", onScroll);
    };
  }, [nextPageUrl]);
  return /* @__PURE__ */ jsx("div", { ref: scrollRef, className: "followers_list max-h-96 h-full overflow-y-auto", children: !!children && children });
};
function Comments({ postId }) {
  const { auth } = usePage().props;
  const [comments, setComments] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState("");
  const {
    data,
    setData,
    post: create,
    processing,
    reset,
    errors
  } = useForm({
    comment: ""
  });
  const submitComment = async (e) => {
    e.preventDefault();
    const resp = await axios.post(route("posts.comments.store", {
      post: postId,
      comment: data.comment
    }));
    const comment = resp.data;
    comment.user = auth.user;
    const commentArr = [comment];
    setComments((prevComments) => {
      return [...commentArr, ...prevComments];
    });
  };
  const commentsRequest = async (url) => {
    const resp = await fetch(url);
    const json = await resp.json();
    setNextPageUrl(json.next_page_url);
    setComments((prevComments) => {
      const uniqueComments = json.data.filter((newComment) => {
        return !prevComments.some((prevComment) => prevComment.id === newComment.id);
      });
      return [...prevComments, ...uniqueComments];
    });
  };
  useEffect(() => {
    commentsRequest(`${appURL$2}/post-comments/${postId}`);
  }, []);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(UseInfiniteScroll, { request: commentsRequest, nextPageUrl, children: comments.map((comment) => {
      return /* @__PURE__ */ jsx(Comment, { user: comment.user, comment, auth }, comment.id);
    }) }),
    /* @__PURE__ */ jsx("div", { className: "post_comments_form", children: /* @__PURE__ */ jsxs("form", { onSubmit: submitComment, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          TextInput,
          {
            type: "text",
            name: "comment",
            value: data.comment,
            onChange: (e) => {
              setData("comment", e.target.value);
            },
            placeholder: "Add a comment"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.comment, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-3", disabled: processing, children: "Post" })
    ] }) })
  ] });
}
function Comment({ user, comment, auth }) {
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors
  } = useForm({
    comment: ""
  });
  const deleteComment = (e) => {
    e.preventDefault();
    destroy(route("comments.destroy", comment.id));
  };
  const open = () => {
    setIsOpenOptions(true);
  };
  const close = () => {
    setIsOpenOptions(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex", children: [
      /* @__PURE__ */ jsx(Avatar, { size: "sm", user }),
      /* @__PURE__ */ jsx("div", { className: "px-4 py-1", children: /* @__PURE__ */ jsxs("p", { children: [
        user.name,
        " ",
        comment.comment
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { onClick: open, children: /* @__PURE__ */ jsxs("svg", { "aria-label": "More options", fill: "currentColor", height: "24", role: "img", viewBox: "0 0 24 24", width: "24", children: [
      /* @__PURE__ */ jsx("title", { children: "More options" }),
      /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "1.5" }),
      /* @__PURE__ */ jsx("circle", { cx: "6", cy: "12", r: "1.5" }),
      /* @__PURE__ */ jsx("circle", { cx: "18", cy: "12", r: "1.5" })
    ] }) }),
    /* @__PURE__ */ jsxs(Modal, { show: isOpenOptions, onClose: close, maxWidth: "sm", children: [
      user.id === auth.user.id && /* @__PURE__ */ jsx("div", { className: "delete_comment border-b border-slate-100", children: /* @__PURE__ */ jsx("form", { onSubmit: deleteComment, className: "flex justify-center", children: /* @__PURE__ */ jsx(TransparentButton, { disableAutofocus: true, className: "h-full w-full text-red-700 p-4", children: "Delete" }) }) }),
      /* @__PURE__ */ jsx(TransparentButton, { disableAutofocus: true, className: "h-full w-full text-black-700 p-4", onClick: close, children: "Cancel" })
    ] })
  ] });
}
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Comment,
  default: Comments
}, Symbol.toStringTag, { value: "Module" }));
function ShowPostModal(props) {
  const { post } = props;
  const { public_url } = usePage().props;
  return /* @__PURE__ */ jsx(Modal, { ...props, children: /* @__PURE__ */ jsxs("div", { className: "flex", children: [
    !!post.images && /* @__PURE__ */ jsx(
      "div",
      {
        className: "w-full max-w-3xl relative pt-59 bg-black	",
        children: /* @__PURE__ */ jsx("img", { className: "w-full absolute object-contain top-0 h-full", src: public_url + "/" + post.images[0].image_path })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md", children: [
      /* @__PURE__ */ jsxs("div", { className: "post-user border-b border-slate-100 border-solid p-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx(Avatar, { user: post.user, size: "sm", divClassName: "mr-4" }),
          /* @__PURE__ */ jsx("div", { children: post.user.name })
        ] }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("svg", { "aria-label": "More options", fill: "currentColor", height: "24", role: "img", viewBox: "0 0 24 24", width: "24", children: [
          /* @__PURE__ */ jsx("title", { children: "More options" }),
          /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "1.5" }),
          /* @__PURE__ */ jsx("circle", { cx: "6", cy: "12", r: "1.5" }),
          /* @__PURE__ */ jsx("circle", { cx: "18", cy: "12", r: "1.5" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "post-message p-4", children: [
        !!post.message && /* @__PURE__ */ jsxs("div", { className: "flex mb-4", children: [
          /* @__PURE__ */ jsx(Avatar, { size: "sm", user: post.user }),
          /* @__PURE__ */ jsxs("div", { className: "px-4 py-1", children: [
            post.user.name,
            " ",
            post.message
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "post-comments", children: /* @__PURE__ */ jsx(Comments, { postId: post.id }) })
      ] })
    ] })
  ] }) });
}
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ShowPostModal
}, Symbol.toStringTag, { value: "Module" }));
function PostsList({ posts, postsRequest, nextPageUrl, grid = "default" }) {
  const { public_url } = usePage().props;
  const [post, setPost] = useState([]);
  const [isOpenPost, setIsOpenPost] = useState(false);
  const showPost = (post2) => {
    setPost(post2);
    setIsOpenPost(true);
  };
  const closePost = () => {
    setIsOpenPost(false);
  };
  const gridClasses = {
    "default": "gap-x-2 gap-y-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    "home": "gap-y-4 grid grid-cols-1"
  }[grid];
  return /* @__PURE__ */ jsxs("div", { className: "user-posts " + gridClasses, children: [
    isOpenPost ? /* @__PURE__ */ jsx(
      ShowPostModal,
      {
        post,
        show: isOpenPost,
        onClose: closePost,
        maxWidth: "7xl"
      }
    ) : null,
    posts.map((post2) => {
      return /* @__PURE__ */ jsx(
        "div",
        {
          className: "cursor-pointer",
          onClick: () => showPost(post2),
          children: /* @__PURE__ */ jsx("img", { src: public_url + "/" + post2.images[0].image_path, className: "object-cover h-full" })
        },
        post2.id
      );
    }),
    /* @__PURE__ */ jsx(UseInfiniteScroll, { request: postsRequest, nextPageUrl })
  ] });
}
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PostsList
}, Symbol.toStringTag, { value: "Module" }));
function Home({ auth }) {
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [posts, setPosts] = useState([]);
  console.log(posts, "posts");
  const postsRequest = async (url) => {
    const resp = await fetch(url);
    const json = await resp.json();
    setNextPageUrl(json.next_page_url);
    setPosts([...posts, ...json.data]);
  };
  useEffect(() => {
    postsRequest(`${appURL$2}/home-posts`);
  }, []);
  return /* @__PURE__ */ jsx(
    Authenticated,
    {
      auth,
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Home" }),
      children: /* @__PURE__ */ jsx("div", { className: "max-w-lg mx-auto", children: /* @__PURE__ */ jsx(
        PostsList,
        {
          posts,
          postsRequest,
          nextPageUrl,
          grid: "home"
        }
      ) })
    }
  );
}
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Home
}, Symbol.toStringTag, { value: "Module" }));
function SecondaryButton({ type = "button", className = "", disabled, children, ...props }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      type,
      className: `inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
function CreatePost(props) {
  const [formState, setFormState] = useRemember({
    message: null
  });
  const {
    data,
    setData,
    post,
    processing,
    reset,
    errors
  } = useForm({
    message: null,
    images: null
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("users.posts.store", props.user.id));
  };
  return /* @__PURE__ */ jsx(Modal, { ...props, children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
    /* @__PURE__ */ jsx(InputLabel, { htmlFor: "message", value: "Message", className: "sr-only" }),
    /* @__PURE__ */ jsx(
      TextInput,
      {
        id: "message",
        type: "text",
        value: data.message || formState.message,
        name: "message",
        onChange: (e) => {
          setData("message", e.target.value);
          setFormState({ "message": e.target.value });
        },
        placeholder: "message"
      }
    ),
    /* @__PURE__ */ jsx(InputLabel, { htmlFor: "image-path", value: "Message", className: "sr-only" }),
    /* @__PURE__ */ jsx(
      TextInput,
      {
        id: "image_path",
        type: "file",
        name: "images",
        onChange: (e) => setData("images", e.target.files[0]),
        placeholder: "Image"
      }
    ),
    /* @__PURE__ */ jsx(InputError, { message: errors.message, className: "mt-2" }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end", children: [
      /* @__PURE__ */ jsx(SecondaryButton, { onClick: props.onClose, children: "Cancel" }),
      /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-3", disabled: processing, children: "Create Post" })
    ] })
  ] }) });
}
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CreatePost
}, Symbol.toStringTag, { value: "Module" }));
function DangerButton({ className = "", disabled, children, ...props }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      className: `inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150 ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
function DeleteUserForm({ className = "" }) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const passwordInput = useRef();
  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors
  } = useForm({
    password: ""
  });
  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };
  const deleteUser = (e) => {
    e.preventDefault();
    destroy(route("profile.destroy"), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current.focus(),
      onFinish: () => reset()
    });
  };
  const closeModal = () => {
    setConfirmingUserDeletion(false);
    reset();
  };
  return /* @__PURE__ */ jsxs("section", { className: `space-y-6 ${className}`, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Delete Account" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain." })
    ] }),
    /* @__PURE__ */ jsx(DangerButton, { onClick: confirmUserDeletion, children: "Delete Account" }),
    /* @__PURE__ */ jsx(Modal, { show: confirmingUserDeletion, onClose: closeModal, children: /* @__PURE__ */ jsxs("form", { onSubmit: deleteUser, className: "p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Are you sure you want to delete your account?" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password", className: "sr-only" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            ref: passwordInput,
            value: data.password,
            onChange: (e) => setData("password", e.target.value),
            className: "mt-1 block w-3/4",
            isFocused: true,
            placeholder: "Password"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end", children: [
        /* @__PURE__ */ jsx(SecondaryButton, { onClick: closeModal, children: "Cancel" }),
        /* @__PURE__ */ jsx(DangerButton, { className: "ms-3", disabled: processing, children: "Delete Account" })
      ] })
    ] }) })
  ] });
}
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DeleteUserForm
}, Symbol.toStringTag, { value: "Module" }));
function UpdatePasswordForm({ className = "" }) {
  const passwordInput = useRef();
  const currentPasswordInput = useRef();
  const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
    current_password: "",
    password: "",
    password_confirmation: ""
  });
  const updatePassword = (e) => {
    e.preventDefault();
    put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errors2) => {
        if (errors2.password) {
          reset("password", "password_confirmation");
          passwordInput.current.focus();
        }
        if (errors2.current_password) {
          reset("current_password");
          currentPasswordInput.current.focus();
        }
      }
    });
  };
  return /* @__PURE__ */ jsxs("section", { className, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Update Password" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Ensure your account is using a long, random password to stay secure." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: updatePassword, className: "mt-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "current_password", value: "Current Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "current_password",
            ref: currentPasswordInput,
            value: data.current_password,
            onChange: (e) => setData("current_password", e.target.value),
            type: "password",
            className: "mt-1 block w-full",
            autoComplete: "current-password"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.current_password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "New Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            ref: passwordInput,
            value: data.password,
            onChange: (e) => setData("password", e.target.value),
            type: "password",
            className: "mt-1 block w-full",
            autoComplete: "new-password"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password_confirmation", value: "Confirm Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password_confirmation",
            value: data.password_confirmation,
            onChange: (e) => setData("password_confirmation", e.target.value),
            type: "password",
            className: "mt-1 block w-full",
            autoComplete: "new-password"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password_confirmation, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Save" }),
        /* @__PURE__ */ jsx(
          Transition,
          {
            show: recentlySuccessful,
            enter: "transition ease-in-out",
            enterFrom: "opacity-0",
            leave: "transition ease-in-out",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Saved." })
          }
        )
      ] })
    ] })
  ] });
}
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UpdatePasswordForm
}, Symbol.toStringTag, { value: "Module" }));
function UpdateProfileInformation({ mustVerifyEmail, status, className = "" }) {
  const user = usePage().props.auth.user;
  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    name: user.name,
    email: user.email
  });
  const submit = (e) => {
    e.preventDefault();
    patch(route("profile.update"));
  };
  return /* @__PURE__ */ jsxs("section", { className, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Profile Information" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Update your account's profile information and email address." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "mt-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Name" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "name",
            className: "mt-1 block w-full",
            value: data.name,
            onChange: (e) => setData("name", e.target.value),
            required: true,
            isFocused: true,
            autoComplete: "name"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.name })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            className: "mt-1 block w-full",
            value: data.email,
            onChange: (e) => setData("email", e.target.value),
            required: true,
            autoComplete: "username"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.email })
      ] }),
      mustVerifyEmail && user.email_verified_at === null && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("p", { className: "text-sm mt-2 text-gray-800", children: [
          "Your email address is unverified.",
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("verification.send"),
              method: "post",
              as: "button",
              className: "underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
              children: "Click here to re-send the verification email."
            }
          )
        ] }),
        status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mt-2 font-medium text-sm text-green-600", children: "A new verification link has been sent to your email address." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Save" }),
        /* @__PURE__ */ jsx(
          Transition,
          {
            show: recentlySuccessful,
            enter: "transition ease-in-out",
            enterFrom: "opacity-0",
            leave: "transition ease-in-out",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Saved." })
          }
        )
      ] })
    ] })
  ] });
}
const __vite_glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UpdateProfileInformation
}, Symbol.toStringTag, { value: "Module" }));
function Edit({ auth, mustVerifyEmail, status }) {
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      auth,
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Profile" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Profile" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6", children: [
          /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-8 bg-white shadow sm:rounded-lg", children: /* @__PURE__ */ jsx(
            UpdateProfileInformation,
            {
              mustVerifyEmail,
              status,
              className: "max-w-xl"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-8 bg-white shadow sm:rounded-lg", children: /* @__PURE__ */ jsx(UpdatePasswordForm, { className: "max-w-xl" }) }),
          /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-8 bg-white shadow sm:rounded-lg", children: /* @__PURE__ */ jsx(DeleteUserForm, { className: "max-w-xl" }) })
        ] }) })
      ]
    }
  );
}
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Edit
}, Symbol.toStringTag, { value: "Module" }));
function Follow({ user, following_id, setFollowersList }) {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const {
    post,
    processing
  } = useForm();
  const openLoginModal = () => {
    setIsOpenLogin(true);
  };
  const closeLoginModal = () => {
    setIsOpenLogin(false);
  };
  const followSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      openLoginModal();
      return;
    }
    post(route("users.followers.store", { user, following_id }), {
      onSuccess: () => {
        if (setFollowersList) {
          setFollowersList(
            (prevFollowersList) => {
              prevFollowersList.forEach((el) => {
                if (el.user.id === following_id) {
                  el.authUserFollowed = true;
                }
              });
              return prevFollowersList;
            }
          );
        }
      }
    });
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("form", { onSubmit: followSubmit, children: /* @__PURE__ */ jsx(PrimaryButton, { className: "bg-blue-600", children: "Follow" }) }),
    /* @__PURE__ */ jsx(Modal, { show: isOpenLogin, onClose: closeLoginModal, children: /* @__PURE__ */ jsx(Login, { canResetPassword: true, canLogin: true }) })
  ] });
}
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Follow
}, Symbol.toStringTag, { value: "Module" }));
function Unfollow({ user, follower, setFollowersList = null }) {
  const {
    delete: destroy,
    processing
  } = useForm();
  const submit = (e) => {
    e.preventDefault();
    destroy(route("users.followers.destroy", { user, follower }), {
      onSuccess: () => {
        if (setFollowersList) {
          setFollowersList(
            (prevFollowersList) => {
              prevFollowersList.forEach((el) => {
                if (el.user.id === follower) {
                  el.authUserFollowed = false;
                }
              });
              return prevFollowersList;
            }
          );
        }
      }
    });
  };
  return /* @__PURE__ */ jsx("form", { onSubmit: submit, children: /* @__PURE__ */ jsx(
    PrimaryButton,
    {
      onClick: submit,
      className: "bg-slate-400 hover:bg-slate-400",
      children: "Following"
    }
  ) });
}
const __vite_glob_0_21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Unfollow
}, Symbol.toStringTag, { value: "Module" }));
function Content({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-5xl mx-auto sm:px-6 lg:px-8", children }) });
}
function ProfileAvatar({ user }) {
  const [open, setOpen] = useState(false);
  const openAvatarForm = () => {
    setOpen(true);
  };
  const closeAvatarForm = () => {
    setOpen(false);
  };
  const {
    data,
    setData,
    post,
    processing,
    reset,
    errors
  } = useForm({
    avatar: ""
  });
  const avatarSubmit = (e) => {
    e.preventDefault();
    post(route("users.avatar.store", user.id));
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { onClick: openAvatarForm, children: /* @__PURE__ */ jsx(Avatar, { user, size: "lg" }) }),
    /* @__PURE__ */ jsx(Modal, { show: open, onClose: closeAvatarForm, children: /* @__PURE__ */ jsxs("form", { onSubmit: avatarSubmit, className: "mt-6 space-y-6", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "file",
          name: "avatar",
          placeholder: "avatar",
          onChange: (e) => setData("avatar", e.target.files[0])
        }
      ),
      /* @__PURE__ */ jsx(InputError, { message: errors.avatar, className: "mt-2" }),
      /* @__PURE__ */ jsx(PrimaryButton, { children: "Save" })
    ] }) })
  ] });
}
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ProfileAvatar
}, Symbol.toStringTag, { value: "Module" }));
function ProfileInfo({ user, auth, totalPosts }) {
  const { public_url } = usePage().props;
  return /* @__PURE__ */ jsx("div", { className: "profile-info", children: /* @__PURE__ */ jsxs("div", { className: "flex", children: [
    /* @__PURE__ */ jsx("div", { className: "user-avatar mr-10", children: /* @__PURE__ */ jsx(ProfileAvatar, { user }) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex space-x-4 justify-between mb-4", children: [
        !!user.name && /* @__PURE__ */ jsx("h1", { className: "font-medium text-xl", children: user.name }),
        auth.guest && auth.following && /* @__PURE__ */ jsx(
          Unfollow,
          {
            user: auth.user && auth.user.id,
            follower: user.id
          }
        ),
        auth.guest && !auth.following && /* @__PURE__ */ jsx(
          Follow,
          {
            user: auth.user && auth.user.id,
            following_id: user.id
          }
        ),
        auth.user.id !== user.id && /* @__PURE__ */ jsx(PrimaryButton, { children: /* @__PURE__ */ jsx(Link, { href: route("chat.index", user.id), children: "Message" }) }),
        !auth.guest && /* @__PURE__ */ jsx(Link, { href: route("profile.edit"), children: /* @__PURE__ */ jsxs("svg", { "aria-label": "Options", className: "x1lliihq x1n2onr6 x5n08af", fill: "currentColor", height: "24", role: "img", viewBox: "0 0 24 24", width: "24", children: [
          /* @__PURE__ */ jsx("title", { children: "Options" }),
          /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", fill: "none", r: "8.635", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2" }),
          /* @__PURE__ */ jsx("path", { d: "M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096", fill: "none", stroke: "currentColor", strokeLinejoin: "round", strokeWidth: "2" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex space-x-6 w-full font-medium text-lg mb-4", children: [
        /* @__PURE__ */ jsx("div", { children: strPlural("post", totalPosts) }),
        /* @__PURE__ */ jsx(
          Followers,
          {
            followers_count: user.followers_count,
            following_count: user.following_count,
            user_id: user.id
          }
        )
      ] }),
      !!user.birthday && /* @__PURE__ */ jsxs("div", { className: "font-medium mb-3 flex items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "max-w-[42px] mr-3", children: /* @__PURE__ */ jsx("img", { src: public_url + "/calendar.png" }) }),
        /* @__PURE__ */ jsx("div", { children: dayjs(user.birthday).format("MMM D YYYY") })
      ] }),
      !!user.biography && /* @__PURE__ */ jsx("div", { className: "max-w-xs leading-4 font-light", children: user.biography })
    ] })
  ] }) });
}
const __vite_glob_0_20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ProfileInfo
}, Symbol.toStringTag, { value: "Module" }));
const AuthContext = createContext(null);
const appURL$1 = "http://127.0.0.1:8000";
function Profile({ auth, user }) {
  const [showPostCreateForm, setShowPostCreateForm] = useState(false);
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [nextPageUrl, setNextPageUrl] = useState("");
  const userPostsRequest = async (url) => {
    const resp = await fetch(url);
    const json = await resp.json();
    setTotalPosts(json.total);
    setNextPageUrl(json.next_page_url);
    setPosts([...posts, ...json.data]);
  };
  useEffect(() => {
    userPostsRequest(`${appURL$1}/users/${user.id}/posts`);
  }, []);
  const openPostCreateForm = () => {
    setShowPostCreateForm(true);
  };
  const closePostCreateForm = () => {
    setShowPostCreateForm(false);
  };
  return /* @__PURE__ */ jsx(AuthContext.Provider, { value: auth, children: /* @__PURE__ */ jsxs(
    Authenticated,
    {
      auth,
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Profile" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Profile" }),
        /* @__PURE__ */ jsxs(Content, { children: [
          /* @__PURE__ */ jsx(ProfileInfo, { totalPosts, user, auth }),
          auth.user.id === user.id && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(PrimaryButton, { onClick: openPostCreateForm, className: "my-6", children: "Add Post" }),
            showPostCreateForm ? /* @__PURE__ */ jsx(CreatePost, { user, show: showPostCreateForm, onClose: closePostCreateForm }) : null
          ] }),
          !!posts && /* @__PURE__ */ jsx(
            PostsList,
            {
              postsRequest: userPostsRequest,
              nextPageUrl,
              posts
            }
          )
        ] })
      ]
    }
  ) });
}
const __vite_glob_0_19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AuthContext,
  default: Profile
}, Symbol.toStringTag, { value: "Module" }));
const appURL = "http://127.0.0.1:8000";
function Followers({ followers_count, following_count, user_id }) {
  const auth = useContext(AuthContext);
  const [followersList, setFollowersList] = useState([]);
  const [isOpenFollowersList, setIsOpenFollowersList] = useState(false);
  const [nextPageUrl, setNextPageUrl] = useState("");
  async function followersRequest(url) {
    const resp = await fetch(url);
    const json = await resp.json();
    setFollowersList([...followersList, ...json.data]);
    setNextPageUrl(json.next_page_url);
    setIsOpenFollowersList(true);
  }
  const closeFollowersListModal = () => {
    setFollowersList([]);
    setIsOpenFollowersList(false);
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex space-x-6", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          onClick: () => followersRequest(`${appURL}/followers/${user_id}`),
          className: "cursor-pointer",
          children: strPlural("folower", followers_count)
        }
      ),
      /* @__PURE__ */ jsxs(
        "div",
        {
          onClick: () => followersRequest(`${appURL}/following/${user_id}`),
          className: "cursor-pointer",
          children: [
            following_count,
            " following"
          ]
        }
      )
    ] }),
    isOpenFollowersList && /* @__PURE__ */ jsx(Modal, { maxWidth: "md", show: isOpenFollowersList, onClose: closeFollowersListModal, children: /* @__PURE__ */ jsxs(UseInfiniteScroll, { request: followersRequest, nextPageUrl, children: [
      /* @__PURE__ */ jsx("div", { className: "border-b text-center p-3 font-medium", onClick: closeFollowersListModal, children: "Followers" }),
      followersList.map((el) => {
        return /* @__PURE__ */ jsxs("div", { className: "flex items-center p-4 justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(Avatar, { size: "sm", user: el.user, divClassName: "mr-4" }),
            el.user.name,
            el.user.id
          ] }),
          el.authUserFollowed ? /* @__PURE__ */ jsx(
            Unfollow,
            {
              user: auth.user.id,
              follower: el.user.id,
              setFollowersList
            }
          ) : /* @__PURE__ */ jsx(
            Follow,
            {
              user: auth.user && auth.user.id,
              following_id: el.user.id,
              setFollowersList
            }
          )
        ] });
      })
    ] }) })
  ] });
}
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Followers
}, Symbol.toStringTag, { value: "Module" }));
function Welcome({ auth, laravelVersion, phpVersion }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Welcome" }),
    /* @__PURE__ */ jsxs("div", { className: "relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white", children: [
      /* @__PURE__ */ jsx("div", { className: "sm:fixed sm:top-0 sm:right-0 p-6 text-end", children: auth.user ? /* @__PURE__ */ jsx(
        Link,
        {
          href: route("home"),
          className: "font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500",
          children: "Home"
        }
      ) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("login"),
            className: "font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500",
            children: "Log in"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("register"),
            className: "ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500",
            children: "Register"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto p-6 lg:p-8", children: [
        /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(
          "svg",
          {
            viewBox: "0 0 62 65",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            className: "h-16 w-auto bg-gray-100 dark:bg-gray-900",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                d: "M61.8548 14.6253C61.8778 14.7102 61.8895 14.7978 61.8897 14.8858V28.5615C61.8898 28.737 61.8434 28.9095 61.7554 29.0614C61.6675 29.2132 61.5409 29.3392 61.3887 29.4265L49.9104 36.0351V49.1337C49.9104 49.4902 49.7209 49.8192 49.4118 49.9987L25.4519 63.7916C25.3971 63.8227 25.3372 63.8427 25.2774 63.8639C25.255 63.8714 25.2338 63.8851 25.2101 63.8913C25.0426 63.9354 24.8666 63.9354 24.6991 63.8913C24.6716 63.8838 24.6467 63.8689 24.6205 63.8589C24.5657 63.8389 24.5084 63.8215 24.456 63.7916L0.501061 49.9987C0.348882 49.9113 0.222437 49.7853 0.134469 49.6334C0.0465019 49.4816 0.000120578 49.3092 0 49.1337L0 8.10652C0 8.01678 0.0124642 7.92953 0.0348998 7.84477C0.0423783 7.8161 0.0598282 7.78993 0.0697995 7.76126C0.0884958 7.70891 0.105946 7.65531 0.133367 7.6067C0.152063 7.5743 0.179485 7.54812 0.20192 7.51821C0.230588 7.47832 0.256763 7.43719 0.290416 7.40229C0.319084 7.37362 0.356476 7.35243 0.388883 7.32751C0.425029 7.29759 0.457436 7.26518 0.498568 7.2415L12.4779 0.345059C12.6296 0.257786 12.8015 0.211853 12.9765 0.211853C13.1515 0.211853 13.3234 0.257786 13.475 0.345059L25.4531 7.2415H25.4556C25.4955 7.26643 25.5292 7.29759 25.5653 7.32626C25.5977 7.35119 25.6339 7.37362 25.6625 7.40104C25.6974 7.43719 25.7224 7.47832 25.7523 7.51821C25.7735 7.54812 25.8021 7.5743 25.8196 7.6067C25.8483 7.65656 25.8645 7.70891 25.8844 7.76126C25.8944 7.78993 25.9118 7.8161 25.9193 7.84602C25.9423 7.93096 25.954 8.01853 25.9542 8.10652V33.7317L35.9355 27.9844V14.8846C35.9355 14.7973 35.948 14.7088 35.9704 14.6253C35.9792 14.5954 35.9954 14.5692 36.0053 14.5405C36.0253 14.4882 36.0427 14.4346 36.0702 14.386C36.0888 14.3536 36.1163 14.3274 36.1375 14.2975C36.1674 14.2576 36.1923 14.2165 36.2272 14.1816C36.2559 14.1529 36.292 14.1317 36.3244 14.1068C36.3618 14.0769 36.3942 14.0445 36.4341 14.0208L48.4147 7.12434C48.5663 7.03694 48.7383 6.99094 48.9133 6.99094C49.0883 6.99094 49.2602 7.03694 49.4118 7.12434L61.3899 14.0208C61.4323 14.0457 61.4647 14.0769 61.5021 14.1055C61.5333 14.1305 61.5694 14.1529 61.5981 14.1803C61.633 14.2165 61.6579 14.2576 61.6878 14.2975C61.7103 14.3274 61.7377 14.3536 61.7551 14.386C61.7838 14.4346 61.8 14.4882 61.8199 14.5405C61.8312 14.5692 61.8474 14.5954 61.8548 14.6253ZM59.893 27.9844V16.6121L55.7013 19.0252L49.9104 22.3593V33.7317L59.8942 27.9844H59.893ZM47.9149 48.5566V37.1768L42.2187 40.4299L25.953 49.7133V61.2003L47.9149 48.5566ZM1.99677 9.83281V48.5566L23.9562 61.199V49.7145L12.4841 43.2219L12.4804 43.2194L12.4754 43.2169C12.4368 43.1945 12.4044 43.1621 12.3682 43.1347C12.3371 43.1097 12.3009 43.0898 12.2735 43.0624L12.271 43.0586C12.2386 43.0275 12.2162 42.9888 12.1887 42.9539C12.1638 42.9203 12.1339 42.8916 12.114 42.8567L12.1127 42.853C12.0903 42.8156 12.0766 42.7707 12.0604 42.7283C12.0442 42.6909 12.023 42.656 12.013 42.6161C12.0005 42.5688 11.998 42.5177 11.9931 42.4691C11.9881 42.4317 11.9781 42.3943 11.9781 42.3569V15.5801L6.18848 12.2446L1.99677 9.83281ZM12.9777 2.36177L2.99764 8.10652L12.9752 13.8513L22.9541 8.10527L12.9752 2.36177H12.9777ZM18.1678 38.2138L23.9574 34.8809V9.83281L19.7657 12.2459L13.9749 15.5801V40.6281L18.1678 38.2138ZM48.9133 9.14105L38.9344 14.8858L48.9133 20.6305L58.8909 14.8846L48.9133 9.14105ZM47.9149 22.3593L42.124 19.0252L37.9323 16.6121V27.9844L43.7219 31.3174L47.9149 33.7317V22.3593ZM24.9533 47.987L39.59 39.631L46.9065 35.4555L36.9352 29.7145L25.4544 36.3242L14.9907 42.3482L24.9533 47.987Z",
                fill: "#FF2D20"
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "mt-16", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8", children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://laravel.com/docs",
              className: "scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500",
              children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "h-16 w-16 bg-red-50 dark:bg-red-800/20 flex items-center justify-center rounded-full", children: /* @__PURE__ */ jsx(
                    "svg",
                    {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      strokeWidth: "1.5",
                      className: "w-7 h-7 stroke-red-500",
                      children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          d: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                        }
                      )
                    }
                  ) }),
                  /* @__PURE__ */ jsx("h2", { className: "mt-6 text-xl font-semibold text-gray-900 dark:text-white", children: "Documentation" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed", children: "Laravel has wonderful documentation covering every aspect of the framework. Whether you are a newcomer or have prior experience with Laravel, we recommend reading our documentation from beginning to end." })
                ] }),
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    strokeWidth: "1.5",
                    className: "self-center shrink-0 stroke-red-500 w-6 h-6 mx-6",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      }
                    )
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://laracasts.com",
              className: "scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500",
              children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "h-16 w-16 bg-red-50 dark:bg-red-800/20 flex items-center justify-center rounded-full", children: /* @__PURE__ */ jsx(
                    "svg",
                    {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      strokeWidth: "1.5",
                      className: "w-7 h-7 stroke-red-500",
                      children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          d: "M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                        }
                      )
                    }
                  ) }),
                  /* @__PURE__ */ jsx("h2", { className: "mt-6 text-xl font-semibold text-gray-900 dark:text-white", children: "Laracasts" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed", children: "Laracasts offers thousands of video tutorials on Laravel, PHP, and JavaScript development. Check them out, see for yourself, and massively level up your development skills in the process." })
                ] }),
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    strokeWidth: "1.5",
                    className: "self-center shrink-0 stroke-red-500 w-6 h-6 mx-6",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      }
                    )
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://laravel-news.com",
              className: "scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500",
              children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "h-16 w-16 bg-red-50 dark:bg-red-800/20 flex items-center justify-center rounded-full", children: /* @__PURE__ */ jsx(
                    "svg",
                    {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      strokeWidth: "1.5",
                      className: "w-7 h-7 stroke-red-500",
                      children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          d: "M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                        }
                      )
                    }
                  ) }),
                  /* @__PURE__ */ jsx("h2", { className: "mt-6 text-xl font-semibold text-gray-900 dark:text-white", children: "Laravel News" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed", children: "Laravel News is a community driven portal and newsletter aggregating all of the latest and most important news in the Laravel ecosystem, including new package releases and tutorials." })
                ] }),
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    strokeWidth: "1.5",
                    className: "self-center shrink-0 stroke-red-500 w-6 h-6 mx-6",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      }
                    )
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500", children: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "h-16 w-16 bg-red-50 dark:bg-red-800/20 flex items-center justify-center rounded-full", children: /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                strokeWidth: "1.5",
                className: "w-7 h-7 stroke-red-500",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64"
                  }
                )
              }
            ) }),
            /* @__PURE__ */ jsx("h2", { className: "mt-6 text-xl font-semibold text-gray-900 dark:text-white", children: "Vibrant Ecosystem" }),
            /* @__PURE__ */ jsxs("p", { className: "mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed", children: [
              "Laravel's robust library of first-party tools and libraries, such as",
              " ",
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://forge.laravel.com",
                  className: "underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500",
                  children: "Forge"
                }
              ),
              ",",
              " ",
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://vapor.laravel.com",
                  className: "underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500",
                  children: "Vapor"
                }
              ),
              ",",
              " ",
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://nova.laravel.com",
                  className: "underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500",
                  children: "Nova"
                }
              ),
              ", and",
              " ",
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://envoyer.io",
                  className: "underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500",
                  children: "Envoyer"
                }
              ),
              " ",
              "help you take your projects to the next level. Pair them with powerful open source libraries like",
              " ",
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://laravel.com/docs/billing",
                  className: "underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500",
                  children: "Cashier"
                }
              ),
              ",",
              " ",
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://laravel.com/docs/dusk",
                  className: "underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500",
                  children: "Dusk"
                }
              ),
              ",",
              " ",
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://laravel.com/docs/broadcasting",
                  className: "underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500",
                  children: "Echo"
                }
              ),
              ",",
              " ",
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://laravel.com/docs/horizon",
                  className: "underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500",
                  children: "Horizon"
                }
              ),
              ",",
              " ",
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://laravel.com/docs/sanctum",
                  className: "underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500",
                  children: "Sanctum"
                }
              ),
              ",",
              " ",
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://laravel.com/docs/telescope",
                  className: "underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500",
                  children: "Telescope"
                }
              ),
              ", and more."
            ] })
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-center mt-16 px-6 sm:items-center sm:justify-between", children: [
          /* @__PURE__ */ jsx("div", { className: "text-center text-sm text-gray-500 dark:text-gray-400 sm:text-start", children: /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://github.com/sponsors/taylorotwell",
              className: "group inline-flex items-center hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500",
              children: [
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    strokeWidth: "1.5",
                    className: "-mt-px me-1 w-5 h-5 stroke-gray-400 dark:stroke-gray-600 group-hover:stroke-gray-600 dark:group-hover:stroke-gray-400",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      }
                    )
                  }
                ),
                "Sponsor"
              ]
            }
          ) }) }),
          /* @__PURE__ */ jsxs("div", { className: "ms-4 text-center text-sm text-gray-500 dark:text-gray-400 sm:text-end sm:ms-0", children: [
            "Laravel v",
            laravelVersion,
            " (PHP v",
            phpVersion,
            ")"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("style", { children: `
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            ` })
  ] });
}
const __vite_glob_0_22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Welcome
}, Symbol.toStringTag, { value: "Module" }));
const Ziggy = { "url": "http://localhost", "port": null, "defaults": {}, "routes": { "sanctum.csrf-cookie": { "uri": "sanctum/csrf-cookie", "methods": ["GET", "HEAD"] }, "ignition.healthCheck": { "uri": "_ignition/health-check", "methods": ["GET", "HEAD"] }, "ignition.executeSolution": { "uri": "_ignition/execute-solution", "methods": ["POST"] }, "ignition.updateConfig": { "uri": "_ignition/update-config", "methods": ["POST"] }, "home": { "uri": "home", "methods": ["GET", "HEAD"] }, "profile.show": { "uri": "profile/{id}", "methods": ["GET", "HEAD"], "parameters": ["id"] }, "profile.edit": { "uri": "profile", "methods": ["GET", "HEAD"] }, "profile.update": { "uri": "profile", "methods": ["PATCH"] }, "profile.destroy": { "uri": "profile", "methods": ["DELETE"] }, "users.posts.index": { "uri": "users/{user}/posts", "methods": ["GET", "HEAD"], "parameters": ["user"], "bindings": { "user": "id" } }, "users.posts.create": { "uri": "users/{user}/posts/create", "methods": ["GET", "HEAD"], "parameters": ["user"], "bindings": { "user": "id" } }, "users.posts.store": { "uri": "users/{user}/posts", "methods": ["POST"], "parameters": ["user"], "bindings": { "user": "id" } }, "users.posts.show": { "uri": "users/{user}/posts/{post}", "methods": ["GET", "HEAD"], "parameters": ["user", "post"] }, "users.posts.edit": { "uri": "users/{user}/posts/{post}/edit", "methods": ["GET", "HEAD"], "parameters": ["user", "post"] }, "users.posts.update": { "uri": "users/{user}/posts/{post}", "methods": ["PUT", "PATCH"], "parameters": ["user", "post"] }, "users.posts.destroy": { "uri": "users/{user}/posts/{post}", "methods": ["DELETE"], "parameters": ["user", "post"] }, "posts.comments.store": { "uri": "posts/{post}/comments", "methods": ["POST"], "parameters": ["post"], "bindings": { "post": "id" } }, "comments.update": { "uri": "comments/{comment}", "methods": ["PUT", "PATCH"], "parameters": ["comment"] }, "comments.destroy": { "uri": "comments/{comment}", "methods": ["DELETE"], "parameters": ["comment"], "bindings": { "comment": "id" } }, "users.avatar.store": { "uri": "users/{user}/avatar", "methods": ["POST"], "parameters": ["user"], "bindings": { "user": "id" } }, "users.avatar.update": { "uri": "users/{user}/avatar/{avatar}", "methods": ["PUT", "PATCH"], "parameters": ["user", "avatar"], "bindings": { "avatar": "id" } }, "users.followers.store": { "uri": "users/{user}/followers", "methods": ["POST"], "parameters": ["user"], "bindings": { "user": "id" } }, "users.followers.destroy": { "uri": "users/{user}/followers/{follower}", "methods": ["DELETE"], "parameters": ["user", "follower"], "bindings": { "user": "id" } }, "chat.index": { "uri": "chat/{receiverId?}", "methods": ["GET", "HEAD"], "parameters": ["receiverId"] }, "chat.lastMessage": { "uri": "chat/lastMessage/{receiverId}", "methods": ["GET", "HEAD"], "parameters": ["receiverId"] }, "chat.getLastChat": { "uri": "chat/lastChat/{receiverId}", "methods": ["GET", "HEAD"], "parameters": ["receiverId"] }, "chat.store": { "uri": "chat/{receiverId?}", "methods": ["POST"], "parameters": ["receiverId"] }, "getChatList": { "uri": "chatList", "methods": ["GET", "HEAD"] }, "register": { "uri": "register", "methods": ["GET", "HEAD"] }, "login": { "uri": "login", "methods": ["GET", "HEAD"] }, "password.request": { "uri": "forgot-password", "methods": ["GET", "HEAD"] }, "password.email": { "uri": "forgot-password", "methods": ["POST"] }, "password.reset": { "uri": "reset-password/{token}", "methods": ["GET", "HEAD"], "parameters": ["token"] }, "password.store": { "uri": "reset-password", "methods": ["POST"] }, "verification.notice": { "uri": "verify-email", "methods": ["GET", "HEAD"] }, "verification.verify": { "uri": "verify-email/{id}/{hash}", "methods": ["GET", "HEAD"], "parameters": ["id", "hash"] }, "verification.send": { "uri": "email/verification-notification", "methods": ["POST"] }, "password.confirm": { "uri": "confirm-password", "methods": ["GET", "HEAD"] }, "password.update": { "uri": "password", "methods": ["PUT"] }, "logout": { "uri": "logout", "methods": ["POST"] } } };
if (typeof window !== "undefined" && typeof window.Ziggy !== "undefined") {
  Object.assign(Ziggy.routes, window.Ziggy.routes);
}
createServer(
  (page) => createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./Pages/Auth/ConfirmPassword.jsx": __vite_glob_0_0, "./Pages/Auth/ForgotPassword.jsx": __vite_glob_0_1, "./Pages/Auth/Login.jsx": __vite_glob_0_2, "./Pages/Auth/Register.jsx": __vite_glob_0_3, "./Pages/Auth/ResetPassword.jsx": __vite_glob_0_4, "./Pages/Auth/VerifyEmail.jsx": __vite_glob_0_5, "./Pages/Chat/Chat.jsx": __vite_glob_0_6, "./Pages/Home.jsx": __vite_glob_0_7, "./Pages/Post/Comment.jsx": __vite_glob_0_8, "./Pages/Post/Create.jsx": __vite_glob_0_9, "./Pages/Post/PostsList.jsx": __vite_glob_0_10, "./Pages/Post/Show.jsx": __vite_glob_0_11, "./Pages/Profile/Edit.jsx": __vite_glob_0_12, "./Pages/Profile/Follow.jsx": __vite_glob_0_13, "./Pages/Profile/Followers.jsx": __vite_glob_0_14, "./Pages/Profile/Partials/DeleteUserForm.jsx": __vite_glob_0_15, "./Pages/Profile/Partials/ProfileAvatar.jsx": __vite_glob_0_16, "./Pages/Profile/Partials/UpdatePasswordForm.jsx": __vite_glob_0_17, "./Pages/Profile/Partials/UpdateProfileInformationForm.jsx": __vite_glob_0_18, "./Pages/Profile/Profile.jsx": __vite_glob_0_19, "./Pages/Profile/ProfileInfo.jsx": __vite_glob_0_20, "./Pages/Profile/Unfollow.jsx": __vite_glob_0_21, "./Pages/Welcome.jsx": __vite_glob_0_22 });
      return pages[`./Pages/${name}.jsx`];
    },
    setup: ({ App, props }) => {
      global.route = (name, params, absolute, config = Ziggy) => route$1(name, params, absolute, config);
      return /* @__PURE__ */ jsx(App, { ...props });
    }
  })
);
