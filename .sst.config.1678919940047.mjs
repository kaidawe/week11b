import { createRequire as topLevelCreateRequire } from 'module';const require = topLevelCreateRequire(import.meta.url);
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// stacks/ApiStack.js
import { Api } from "sst/constructs";
function API({ stack }) {
  const api = new Api(stack, "api", {
    defaults: {
      function: {
        environment: {
          DATABASE_URL: process.env.DATABASE_URL
        }
      }
    },
    routes: {
      "GET /chats": "packages/functions/src/getChats.main",
      "POST /chats": "packages/functions/src/createChat.main",
      "PUT /chats/{id}": "packages/functions/src/updateChat.main",
      "DELETE /chats/{id}": "packages/functions/src/deleteChat.main",
      "GET /chats/{id}/messages": "packages/functions/src/messages/getMessages.main",
      "POST /chats/{id}/messages": "packages/functions/src/messages/createMessage.main",
      "PUT /chats/{id}/messages/{messageId}": "packages/functions/src/messages/updateMessage.main",
      "DELETE /chats/{id}/messages/{messageId}": "packages/functions/src/messages/deleteMessage.main"
    }
  });
  stack.addOutputs({
    ApiEndpoint: api.url
  });
  return { api };
}
__name(API, "API");

// stacks/FrontendStack.js
import { StaticSite, use } from "sst/constructs";
function FrontendStack({ stack, app }) {
  const { api } = use(API);
  const site = new StaticSite(stack, "ReactSite", {
    path: "frontend",
    buildOutput: "dist",
    buildCommand: 'echo "cest la vie"',
    environment: {
      VITE_API_URL: api.customDomainUrl || api.url
    }
  });
  stack.addOutputs({
    SiteUrl: site.url || ""
  });
}
__name(FrontendStack, "FrontendStack");

// sst.config.js
var sst_config_default = {
  config(_input) {
    return {
      name: "Week11b",
      region: "us-east-1"
    };
  },
  stacks(app) {
    app.stack(API).stack(FrontendStack);
  }
};
export {
  sst_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3RhY2tzL0FwaVN0YWNrLmpzIiwgInN0YWNrcy9Gcm9udGVuZFN0YWNrLmpzIiwgInNzdC5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IEFwaSB9IGZyb20gXCJzc3QvY29uc3RydWN0c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gQVBJKHsgc3RhY2sgfSkge1xuICBjb25zdCBhcGkgPSBuZXcgQXBpKHN0YWNrLCBcImFwaVwiLCB7XG4gICAgZGVmYXVsdHM6IHtcbiAgICAgIGZ1bmN0aW9uOiB7XG4gICAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgICAgREFUQUJBU0VfVVJMOiBwcm9jZXNzLmVudi5EQVRBQkFTRV9VUkwsXG4gICAgICB9XG4gICAgfX0sXG4gICAgcm91dGVzOiB7XG4gICAgICBcIkdFVCAvY2hhdHNcIjogXCJwYWNrYWdlcy9mdW5jdGlvbnMvc3JjL2dldENoYXRzLm1haW5cIixcbiAgICAgIFwiUE9TVCAvY2hhdHNcIjogXCJwYWNrYWdlcy9mdW5jdGlvbnMvc3JjL2NyZWF0ZUNoYXQubWFpblwiLFxuICAgICAgXCJQVVQgL2NoYXRzL3tpZH1cIjogXCJwYWNrYWdlcy9mdW5jdGlvbnMvc3JjL3VwZGF0ZUNoYXQubWFpblwiLFxuICAgICAgXCJERUxFVEUgL2NoYXRzL3tpZH1cIjogXCJwYWNrYWdlcy9mdW5jdGlvbnMvc3JjL2RlbGV0ZUNoYXQubWFpblwiLFxuICAgICAgXCJHRVQgL2NoYXRzL3tpZH0vbWVzc2FnZXNcIjogXCJwYWNrYWdlcy9mdW5jdGlvbnMvc3JjL21lc3NhZ2VzL2dldE1lc3NhZ2VzLm1haW5cIixcbiAgICAgIFwiUE9TVCAvY2hhdHMve2lkfS9tZXNzYWdlc1wiOiBcInBhY2thZ2VzL2Z1bmN0aW9ucy9zcmMvbWVzc2FnZXMvY3JlYXRlTWVzc2FnZS5tYWluXCIsXG4gICAgICBcIlBVVCAvY2hhdHMve2lkfS9tZXNzYWdlcy97bWVzc2FnZUlkfVwiOiBcInBhY2thZ2VzL2Z1bmN0aW9ucy9zcmMvbWVzc2FnZXMvdXBkYXRlTWVzc2FnZS5tYWluXCIsXG4gICAgICBcIkRFTEVURSAvY2hhdHMve2lkfS9tZXNzYWdlcy97bWVzc2FnZUlkfVwiOiBcInBhY2thZ2VzL2Z1bmN0aW9ucy9zcmMvbWVzc2FnZXMvZGVsZXRlTWVzc2FnZS5tYWluXCIsXG4gICAgfSxcbiAgfSk7XG5cbiAgICAvLyB0aGlzIGlzIHdoZXJlIEkgd291bGQgc2F5IHdoYXQgSSB3YW50IHRvIGNyZWF0ZSBpbiBBV1NcblxuICBzdGFjay5hZGRPdXRwdXRzKHtcbiAgICBBcGlFbmRwb2ludDogYXBpLnVybCxcbiAgfSk7XG5cbiAgcmV0dXJuIHthcGl9O1xufVxuIiwgImltcG9ydCB7IFN0YXRpY1NpdGUsIHVzZSB9IGZyb20gXCJzc3QvY29uc3RydWN0c1wiO1xyXG5pbXBvcnQgeyBBUEkgfSBmcm9tIFwiLi9BcGlTdGFja1wiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEZyb250ZW5kU3RhY2soeyBzdGFjaywgYXBwIH0pIHtcclxuICBjb25zdCB7IGFwaSB9ID0gdXNlKEFQSSk7XHJcblxyXG4gIGNvbnN0IHNpdGUgPSBuZXcgU3RhdGljU2l0ZShzdGFjaywgXCJSZWFjdFNpdGVcIiwge1xyXG4gICAgcGF0aDogXCJmcm9udGVuZFwiLFxyXG4gICAgYnVpbGRPdXRwdXQ6IFwiZGlzdFwiLFxyXG4gICAgYnVpbGRDb21tYW5kOiBcImVjaG8gXFxcImNlc3QgbGEgdmllXFxcIlwiLFxyXG4gICAgLy8gUGFzcyBpbiBvdXIgZW52aXJvbm1lbnQgdmFyaWFibGVzXHJcbiAgICBlbnZpcm9ubWVudDoge1xyXG4gICAgICBWSVRFX0FQSV9VUkw6IGFwaS5jdXN0b21Eb21haW5VcmwgfHwgYXBpLnVybCxcclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gIC8vIFNob3cgdGhlIHVybCBpbiB0aGUgb3V0cHV0XHJcbiAgc3RhY2suYWRkT3V0cHV0cyh7XHJcbiAgICBTaXRlVXJsOiBzaXRlLnVybCB8fCBcIlwiLFxyXG4gIH0pO1xyXG59XHJcblxyXG4iLCAiaW1wb3J0IHsgQVBJIH0gZnJvbSBcIi4vc3RhY2tzL0FwaVN0YWNrXCI7XG5pbXBvcnQgeyBGcm9udGVuZFN0YWNrIH0gZnJvbSBcIi4vc3RhY2tzL0Zyb250ZW5kU3RhY2tcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWcoX2lucHV0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IFwiV2VlazExYlwiLFxuICAgICAgcmVnaW9uOiBcInVzLWVhc3QtMVwiLFxuICAgIH07XG4gIH0sXG5cbiAgc3RhY2tzKGFwcCkge1xuICAgIGFwcC5zdGFjayhBUEkpLnN0YWNrKEZyb250ZW5kU3RhY2spXG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7O0FBQUEsU0FBUyxXQUFXO0FBRWIsU0FBUyxJQUFJLEVBQUUsTUFBTSxHQUFHO0FBQzdCLFFBQU0sTUFBTSxJQUFJLElBQUksT0FBTyxPQUFPO0FBQUEsSUFDaEMsVUFBVTtBQUFBLE1BQ1IsVUFBVTtBQUFBLFFBQ1IsYUFBYTtBQUFBLFVBQ1gsY0FBYyxRQUFRLElBQUk7QUFBQSxRQUM5QjtBQUFBLE1BQ0Y7QUFBQSxJQUFDO0FBQUEsSUFDRCxRQUFRO0FBQUEsTUFDTixjQUFjO0FBQUEsTUFDZCxlQUFlO0FBQUEsTUFDZixtQkFBbUI7QUFBQSxNQUNuQixzQkFBc0I7QUFBQSxNQUN0Qiw0QkFBNEI7QUFBQSxNQUM1Qiw2QkFBNkI7QUFBQSxNQUM3Qix3Q0FBd0M7QUFBQSxNQUN4QywyQ0FBMkM7QUFBQSxJQUM3QztBQUFBLEVBQ0YsQ0FBQztBQUlELFFBQU0sV0FBVztBQUFBLElBQ2YsYUFBYSxJQUFJO0FBQUEsRUFDbkIsQ0FBQztBQUVELFNBQU8sRUFBQyxJQUFHO0FBQ2I7QUEzQmdCOzs7QUNGaEIsU0FBUyxZQUFZLFdBQVc7QUFHekIsU0FBUyxjQUFjLEVBQUUsT0FBTyxJQUFJLEdBQUc7QUFDNUMsUUFBTSxFQUFFLElBQUksSUFBSSxJQUFJLEdBQUc7QUFFdkIsUUFBTSxPQUFPLElBQUksV0FBVyxPQUFPLGFBQWE7QUFBQSxJQUM5QyxNQUFNO0FBQUEsSUFDTixhQUFhO0FBQUEsSUFDYixjQUFjO0FBQUEsSUFFZCxhQUFhO0FBQUEsTUFDWCxjQUFjLElBQUksbUJBQW1CLElBQUk7QUFBQSxJQUMzQztBQUFBLEVBQ0YsQ0FBQztBQUdELFFBQU0sV0FBVztBQUFBLElBQ2YsU0FBUyxLQUFLLE9BQU87QUFBQSxFQUN2QixDQUFDO0FBQ0g7QUFqQmdCOzs7QUNBaEIsSUFBTyxxQkFBUTtBQUFBLEVBQ2IsT0FBTyxRQUFRO0FBQ2IsV0FBTztBQUFBLE1BQ0wsTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLElBQ1Y7QUFBQSxFQUNGO0FBQUEsRUFFQSxPQUFPLEtBQUs7QUFDVixRQUFJLE1BQU0sR0FBRyxFQUFFLE1BQU0sYUFBYTtBQUFBLEVBQ3BDO0FBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
