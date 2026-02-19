"use strict";(()=>{var e={};e.id=774,e.ids=[774],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},61282:e=>{e.exports=require("child_process")},84770:e=>{e.exports=require("crypto")},80665:e=>{e.exports=require("dns")},17702:e=>{e.exports=require("events")},92048:e=>{e.exports=require("fs")},32615:e=>{e.exports=require("http")},35240:e=>{e.exports=require("https")},98216:e=>{e.exports=require("net")},19801:e=>{e.exports=require("os")},55315:e=>{e.exports=require("path")},76162:e=>{e.exports=require("stream")},82452:e=>{e.exports=require("tls")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},71568:e=>{e.exports=require("zlib")},24884:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>f,patchFetch:()=>g,requestAsyncStorage:()=>c,routeModule:()=>l,serverHooks:()=>x,staticGenerationAsyncStorage:()=>u});var o={};r.r(o),r.d(o,{POST:()=>n});var s=r(73278),p=r(45002),a=r(54877),d=r(71309),i=r(36384);async function n(e){try{let t=await e.json(),{name:r,email:o,service:s,message:p}=t;if(!r||!o||!s||!p)return d.NextResponse.json({error:"Missing required fields: name, email, service, message"},{status:400});if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o))return d.NextResponse.json({error:"Invalid email address"},{status:400});return await (0,i.Cz)({subject:`[Quote] ${s} — from ${r}`,html:(0,i.tb)({name:r,email:o,company:t.company,phone:t.phone,service:s,monthlyUnits:t.monthlyUnits,message:p}),replyTo:o}),d.NextResponse.json({success:!0,message:"Quote request received"})}catch(e){return console.error("Quote form error:",e),d.NextResponse.json({error:"Failed to send quote request. Please try again."},{status:500})}}let l=new s.AppRouteRouteModule({definition:{kind:p.x.APP_ROUTE,page:"/api/quote/route",pathname:"/api/quote",filename:"route",bundlePath:"app/api/quote/route"},resolvedPagePath:"/Users/macbook/Desktop/24:7Onboarding/247-fba-platform/src/app/api/quote/route.ts",nextConfigOutput:"",userland:o}),{requestAsyncStorage:c,staticGenerationAsyncStorage:u,serverHooks:x}=l,f="/api/quote/route";function g(){return(0,a.patchFetch)({serverHooks:x,staticGenerationAsyncStorage:u})}},36384:(e,t,r)=>{r.d(t,{Cz:()=>s,S9:()=>p,tb:()=>a});let o=r(56742).createTransport({host:process.env.SMTP_HOST||"smtp.gmail.com",port:parseInt(process.env.SMTP_PORT||"587"),secure:"true"===process.env.SMTP_SECURE,auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}});async function s({to:e,subject:t,html:r,replyTo:s}){let p=e||process.env.EMAIL_TO||"info@247fba.de",a=process.env.EMAIL_FROM||"noreply@247fba.de";return process.env.SMTP_USER?(await o.sendMail({from:`"24/7 FBA Prep" <${a}>`,to:p,subject:t,html:r,replyTo:s}),{success:!0,dev:!1}):(console.log("=== Email (dev mode - SMTP not configured) ==="),console.log("To:",p),console.log("From:",a),console.log("Subject:",t),console.log("Reply-To:",s||"N/A"),console.log("Body:",r.replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),console.log("============================================"),{success:!0,dev:!0})}function p(e){return`
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #1e2d3d; padding: 24px; border-radius: 12px 12px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 20px;">New Contact Form Submission</h1>
      </div>
      <div style="background: #ffffff; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 120px;">Name</td>
            <td style="padding: 8px 0; color: #1a1a2e; font-weight: 600;">${e.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email</td>
            <td style="padding: 8px 0;"><a href="mailto:${e.email}" style="color: #e8842c;">${e.email}</a></td>
          </tr>
          ${e.company?`<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Company</td><td style="padding: 8px 0; color: #1a1a2e;">${e.company}</td></tr>`:""}
          ${e.phone?`<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Phone</td><td style="padding: 8px 0; color: #1a1a2e;">${e.phone}</td></tr>`:""}
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Subject</td>
            <td style="padding: 8px 0; color: #1a1a2e; font-weight: 600;">${e.subject}</td>
          </tr>
        </table>
        <div style="margin-top: 16px; padding: 16px; background: #f8f9fa; border-radius: 8px;">
          <p style="color: #6b7280; font-size: 12px; margin: 0 0 8px;">Message</p>
          <p style="color: #1a1a2e; margin: 0; white-space: pre-wrap;">${e.message}</p>
        </div>
      </div>
    </div>
  `}function a(e){return`
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #e8842c; padding: 24px; border-radius: 12px 12px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 20px;">New Quote Request</h1>
      </div>
      <div style="background: #ffffff; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 140px;">Name</td>
            <td style="padding: 8px 0; color: #1a1a2e; font-weight: 600;">${e.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email</td>
            <td style="padding: 8px 0;"><a href="mailto:${e.email}" style="color: #e8842c;">${e.email}</a></td>
          </tr>
          ${e.company?`<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Company</td><td style="padding: 8px 0; color: #1a1a2e;">${e.company}</td></tr>`:""}
          ${e.phone?`<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Phone</td><td style="padding: 8px 0; color: #1a1a2e;">${e.phone}</td></tr>`:""}
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Service</td>
            <td style="padding: 8px 0; color: #1a1a2e; font-weight: 600;">${e.service}</td>
          </tr>
          ${e.monthlyUnits?`<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Monthly Units</td><td style="padding: 8px 0; color: #1a1a2e;">${e.monthlyUnits}</td></tr>`:""}
        </table>
        <div style="margin-top: 16px; padding: 16px; background: #f8f9fa; border-radius: 8px;">
          <p style="color: #6b7280; font-size: 12px; margin: 0 0 8px;">Details</p>
          <p style="color: #1a1a2e; margin: 0; white-space: pre-wrap;">${e.message}</p>
        </div>
      </div>
    </div>
  `}}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[9379,4833,6742],()=>r(24884));module.exports=o})();