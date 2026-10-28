"use client";
import { useButton } from "@/services/contextService/admin/buttonContextProvicer";
import React from "react";
import { 
  IoMdTrendingUp, 
  IoMdCart, 
  IoMdPeople, 
  IoMdCube, 
  IoIosArrowForward, 
  IoMdAdd, 
  IoMdStats 
} from "react-icons/io";

export default function OverviewPage() {
  // Mock data for analytics metric indicators
  const metrics = [
    {
      id: 1,
      title: "Total Revenue",
      value: "$24,845.50",
      change: "+12.4%",
      isPositive: true,
      icon: <IoMdTrendingUp className="text-lg text-emerald-600" />,
      bg: "bg-emerald-50",
    },
    {
      id: 2,
      title: "Active Products",
      value: "148",
      change: "+4 new",
      isPositive: true,
      icon: <IoMdCube className="text-lg text-neutral-900" />,
      bg: "bg-neutral-100",
    },
    {
      id: 3,
      title: "Monthly Orders",
      value: "1,429",
      change: "-2.1%",
      isPositive: false,
      icon: <IoMdCart className="text-lg text-blue-600" />,
      bg: "bg-blue-50",
    },
    {
      id: 4,
      title: "Customer Conversion",
      value: "3.84%",
      change: "+0.8%",
      isPositive: true,
      icon: <IoMdPeople className="text-lg text-amber-600" />,
      bg: "bg-amber-50",
    },
  ];

  const {handleAddProduct} = useButton()

  // Mock data for recent orders / activity feed
  const recentOrders = [
    { id: "ORD-9281", customer: "Aarav Sharma", item: "Hemp Oversized Shirt", amount: "$85.00", status: "Completed" },
    { id: "ORD-9280", customer: "Priya Patel", item: "Nivini Mountain Backpack", amount: "$120.00", status: "Processing" },
    { id: "ORD-9279", customer: "Liam Smith", item: "Eco Organic T-Shirt", amount: "$45.00", status: "Completed" },
    { id: "ORD-9278", customer: "Sophia Chen", item: "Sustainable Winter Jacket", amount: "$140.00", status: "Pending" },
  ];

  return (
    <div className="space-y-8 font-sans">
      
      {/* Top Welcome Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-2xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Main Dashboard</span>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-900 mt-1">
            Welcome back, Admin 👋
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Here's what's happening with your sustainable store catalog today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 transition-all cursor-pointer">
            <IoMdStats className="text-sm" />
            View Reports
          </button>
          <button onClick={(e)=>handleAddProduct("Add")} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-800 transition-all shadow-sm cursor-pointer">
            <IoMdAdd className="text-sm" />
            Add New Product
          </button>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      {/*<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((metric) => (
          <div 
            key={metric.id}
            className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-2xs flex flex-col justify-between space-y-4 hover:border-neutral-300 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                {metric.title}
              </span>
              <div className={`p-2.5 rounded-xl ${metric.bg}`}>
                {metric.icon}
              </div>
            </div>

            <div className="flex items-baseline justify-between">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                {metric.value}
              </h3>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                metric.isPositive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
              }`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lower Section Grid: Recent Activity & Quick Shortcuts */}
     {/*} <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Recent Orders Table List (Span 8) */}
        {/* <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-2xs space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Recent Customer Orders
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">Latest transactional flow from store visitors.</p>
            </div>
            <button className="text-xs font-semibold text-neutral-900 hover:underline flex items-center gap-1 cursor-pointer">
              View All <IoIosArrowForward className="text-xs" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-100 text-neutral-400 uppercase font-semibold text-[10px]">
                  <th className="pb-3 font-semibold">Order ID</th>
                  <th className="pb-3 font-semibold">Customer</th>
                  <th className="pb-3 font-semibold">Item</th>
                  <th className="pb-3 font-semibold">Amount</th>
                  <th className="pb-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50/60 transition-colors">
                    <td className="py-3.5 font-mono font-medium text-neutral-600">{order.id}</td>
                    <td className="py-3.5 font-semibold text-neutral-900">{order.customer}</td>
                    <td className="py-3.5 text-neutral-600 truncate max-w-[150px]">{order.item}</td>
                    <td className="py-3.5 font-medium text-neutral-900">{order.amount}</td>
                    <td className="py-3.5 text-right">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                        order.status === "Completed" 
                          ? "bg-emerald-50 text-emerald-700" 
                          : order.status === "Processing" 
                          ? "bg-blue-50 text-blue-700" 
                          : "bg-amber-50 text-amber-700"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div> */}

        {/* Quick Management Shortcuts / Status Widgets (Span 4) */}
        {/* <div className="lg:col-span-4 space-y-6"> */}
          
          {/* System Status Card */}
          {/* <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              System Health
            </h3>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-neutral-600">Database Storage</span>
                  <span className="text-neutral-900 font-semibold">42% Used</span>
                </div>
                <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-neutral-900 h-full w-[42%] rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-neutral-600">API Gateway Bandwidth</span>
                  <span className="text-neutral-900 font-semibold">18% Usage</span>
                </div>
                <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full w-[18%] rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400">
              <span>Server Region</span>
              <span className="font-mono text-neutral-700 font-semibold">ap-south-1 (Mumbai)</span>
            </div>
          </div> */}

          {/* Quick Shortcuts List */}
          {/* <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Quick Controls
            </h3>
            <div className="space-y-2">
              <button className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium bg-neutral-50 hover:bg-neutral-100 text-neutral-700 transition-all flex items-center justify-between cursor-pointer">
                <span>Export Catalog CSV</span>
                <span className="text-[10px] bg-neutral-200 text-neutral-600 px-1.5 py-0.5 rounded font-mono">XLS</span>
              </button>
              <button className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium bg-neutral-50 hover:bg-neutral-100 text-neutral-700 transition-all flex items-center justify-between cursor-pointer">
                <span>Clear Site Cache</span>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-semibold">Optimal</span>
              </button>
              <button className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium bg-neutral-50 hover:bg-neutral-100 text-neutral-700 transition-all flex items-center justify-between cursor-pointer">
                <span>Manage Admin Permissions</span>
                <IoIosArrowForward className="text-neutral-400" />
              </button>
            </div>
          </div>

        </div> */}

      {/* </div> */}
      
    </div>
  );
}