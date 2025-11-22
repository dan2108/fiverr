'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FileText, Video, Palette, Settings, FolderOpen, Briefcase } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Portfolio', href: '/portfolio', icon: Briefcase },
  { name: 'Social Content', href: '/social', icon: FileText },
  { name: 'TikTok Scripts', href: '/scripts', icon: Video },
  { name: 'Branding Kits', href: '/branding', icon: Palette },
  { name: 'Projects', href: '/projects', icon: FolderOpen },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-1 p-4">
      {navigation.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href))
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}

