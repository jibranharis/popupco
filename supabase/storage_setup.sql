-- Supabase Storage Setup for Avatars

-- 1. Create the bucket
insert into storage.buckets (id, name, public) 
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- 2. Allow public read access to the avatars bucket
create policy "Avatar images are publicly accessible"
on storage.objects for select
using (bucket_id = 'avatars');

-- 3. Allow authenticated users to upload their own avatar
create policy "Users can upload their own avatar"
on storage.objects for insert
with check (
  bucket_id = 'avatars' 
  and auth.role() = 'authenticated'
);

-- 4. Allow authenticated users to update their own avatar
create policy "Users can update their own avatar"
on storage.objects for update
with check (
  bucket_id = 'avatars' 
  and auth.role() = 'authenticated'
);
