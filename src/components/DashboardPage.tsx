import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { TrendingUp, Eye, ShoppingCart, Heart, Users, Star, ArrowUp, ArrowDown, MoreVertical } from 'lucide-react';
import { motion } from 'motion/react';
import { mockDashboardStats, mockProducts } from '../lib/mock-data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface DashboardPageProps {
  onNavigate: (page: string) => void;
}

  interface DashboardPageProps {
    onNavigate: (page: string) => void;
    language: 'en' | 'hi';
  }

  export default function DashboardPage({ onNavigate, language }: DashboardPageProps) {
  const stats = mockDashboardStats;

  const monthlyData = [
    { month: 'Jan', views: 850, sales: 12000 },
    { month: 'Feb', views: 1200, sales: 18000 },
    { month: 'Mar', views: 980, sales: 15000 },
    { month: 'Apr', views: 1450, sales: 22000 },
    { month: 'May', views: 1680, sales: 28000 },
    { month: 'Jun', views: 2100, sales: 35000 }
  ];

  const categoryData = [
    { name: 'Pottery', value: 35, color: '#c17b47' },
    { name: 'Textiles', value: 45, color: '#d4af37' },
    { name: 'Jewelry', value: 20, color: '#4a5568' }
  ];

  const quickStats = [
    {
      title: 'Total Views',
      value: stats.totalViews.toLocaleString(),
      change: '+12%',
      changeType: 'positive',
      icon: Eye,
      color: 'blue'
    },
    {
      title: 'Total Sales',
      value: `₹${stats.totalSales.toLocaleString()}`,
      change: '+24%',
      changeType: 'positive',
      icon: ShoppingCart,
      color: 'green'
    },
    {
      title: 'Profile Visits',
      value: '2,450',
      change: '+8%',
      changeType: 'positive',
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Avg. Rating',
      value: '4.8',
      change: '+0.2',
      changeType: 'positive',
      icon: Star,
      color: 'yellow'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--beige)]/30 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Welcome back, Priya! 👋
              </h1>
              <p className="text-gray-600">
                Here's how your crafts are performing on CraftLink
              </p>
            </div>
            <Button 
              onClick={() => onNavigate('upload')}
              className="bg-[var(--terracotta)] hover:bg-[var(--terracotta)]/90"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Add New Craft
            </Button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <div className="flex items-center mt-2">
                        {stat.changeType === 'positive' ? (
                          <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                        ) : (
                          <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
                        )}
                        <span className={`text-sm ${
                          stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.change} from last month
                        </span>
                      </div>
                    </div>
                    <div className={`w-12 h-12 rounded-full bg-${stat.color}-100 flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Views & Sales Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Views & Sales Trend</span>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line 
                      yAxisId="left" 
                      type="monotone" 
                      dataKey="views" 
                      stroke="var(--terracotta)" 
                      strokeWidth={3} 
                      dot={{ fill: 'var(--terracotta)' }}
                    />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="sales" 
                      stroke="var(--gold)" 
                      strokeWidth={3} 
                      dot={{ fill: 'var(--gold)' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Category Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-4">
                  {categoryData.map(category => (
                    <div key={category.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="text-sm">{category.name}</span>
                      </div>
                      <span className="text-sm text-gray-600">{category.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Top Performing Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Top Performing Products</span>
                  <Badge variant="secondary">This Month</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                          index === 0 ? 'bg-[var(--gold)]' : 
                          index === 1 ? 'bg-gray-400' : 'bg-orange-400'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-600">{product.views} views</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Progress value={(product.views / 1250) * 100} className="w-20 mb-1" />
                        <p className="text-xs text-gray-500">
                          {Math.round((product.views / 1250) * 100)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Recent Orders</span>
                  <Button variant="ghost" size="sm" onClick={() => onNavigate('marketplace')}>
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.recentOrders.map((order, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{order.product}</p>
                        <p className="text-sm text-gray-600">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[var(--terracotta)]">
                          ₹{order.amount.toLocaleString()}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          Completed
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Trending Crafts */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-[var(--terracotta)]" />
                <span>Trending Craft Categories</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                {stats.trendingCrafts.map((craft, index) => (
                  <div key={craft} className="text-center p-4 bg-gradient-to-br from-[var(--beige)]/30 to-white rounded-lg">
                    <div className="text-2xl mb-2">
                      {index === 0 && '🏺'}
                      {index === 1 && '🧵'}
                      {index === 2 && '💎'}
                      {index === 3 && '🕉️'}
                    </div>
                    <p className="font-medium text-gray-900">{craft}</p>
                    <p className="text-sm text-[var(--terracotta)]">+{Math.floor(Math.random() * 30 + 10)}% interest</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* AI Insights */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-[var(--terracotta)]/5 to-[var(--gold)]/5">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-r from-[var(--terracotta)] to-[var(--gold)] rounded-full flex items-center justify-center">
                  <TrendingUp className="w-3 h-3 text-white" />
                </div>
                <span>AI-Powered Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-[var(--terracotta)] mb-2">92%</div>
                  <p className="text-sm text-gray-600 mb-2">Story Engagement Rate</p>
                  <p className="text-xs text-gray-500">Products with AI-generated cultural stories get 92% more engagement</p>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-[var(--gold)] mb-2">5.2x</div>
                  <p className="text-sm text-gray-600 mb-2">Social Media Reach</p>
                  <p className="text-xs text-gray-500">AI-generated captions increase social media reach by 5.2x</p>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-[var(--terracotta)] mb-2">73%</div>
                  <p className="text-sm text-gray-600 mb-2">Multi-language Interest</p>
                  <p className="text-xs text-gray-500">73% of customers engage with translated content</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}