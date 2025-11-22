'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FileText, Video, Palette, Settings, FolderOpen, Menu, X, Briefcase } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Portfolio', href: '/portfolio', icon: Briefcase },
  { name: 'Social Content', href: '/social', icon: FileText },
  { name: 'TikTok Scripts', href: '/scripts', icon: Video },
  { name: 'Branding Kits', href: '/branding', icon: Palette },
  { name: 'Projects', href: '/projects', icon: FolderOpen },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <div className="md:hidden border-b bg-card p-4 flex items-center justify-between">
        <h1 className="text-lg font-bold">AI Fiverr Studio</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      {open && (
        <nav className="md:hidden border-b bg-card p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href))
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
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
      )}
    </>
  )
}

