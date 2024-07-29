
# install
apt install build-essential git gcc g++ make libpcre3-dev libxml2 libxml2-dev libyajl-dev zlib1g-dev automake libtool pkg-config git libmodsecurity3 -y

# ModSecurity 3.0.12 다운로드 및 설치
cd /usr/local/src
git clone --depth 1 -b v3.0.12 --single-branch https://github.com/SpiderLabs/ModSecurity
cd ModSecurity
git submodule init && git submodule update
./build.sh
./configure
make && make install

# ModSecurity Nginx Connector 설치
cd /usr/local/src
git clone --depth 1 https://github.com/SpiderLabs/ModSecurity-nginx.git


# add openssl
cd /usr/local/src
wget https://www.openssl.org/source/openssl-3.3.1.tar.gz && tar -zxvf openssl-3.3.1.tar.gz

# Nginx 소스 다운로드 및 컴파일
# nginx-1.24.0.tar.gz(작성일 기준 최신)
cd /usr/local/src
wget http://nginx.org/download/nginx-1.21.0.tar.gz
tar zxvf nginx-1.21.0.tar.gz
cd nginx-1.21.0
./configure \
    --prefix=/usr/local/nginx \
    --with-http_ssl_module \
    --with-http_realip_module \
    --with-http_addition_module \
    --with-http_sub_module \
    --with-http_dav_module \
    --with-http_flv_module \
    --with-http_mp4_module \
    --with-http_gunzip_module \
    --with-http_gzip_static_module \
    --with-http_random_index_module \
    --with-http_secure_link_module \
    --with-http_stub_status_module \
    --with-stream \
    --with-stream_ssl_module \
    --with-stream_ssl_preread_module \
    --with-mail \
    --with-mail_ssl_module \
    --with-file-aio \
    --with-threads \
    --with-http_v2_module \
    --with-openssl=../openssl-3.3.1 \
    --with-openssl-opt=enable-tls1_3 \
    --with-openssl-opt=no-nextprotoneg \
    --with-openssl-opt=no-weak-ssl-ciphers \
    --with-cc-opt='-O2 -g -pipe -Wall -Wp,-D_FORTIFY_SOURCE=2 -fexceptions -fstack-protector-strong -grecord-gcc-switches -m64 -mtune=generic' \
    --with-ld-opt='-Wl,-z,relro -Wl,-z,now -Wl,--as-needed -pie' \
    --with-compat \
    --add-dynamic-module=../ModSecurity-nginx
sudo make modules
sudo cp objs/ngx_http_modsecurity_module.so /etc/nginx/modules


sudo apt update
sudo apt install curl gnupg2 ca-certificates lsb-release -y
curl -fsSL https://nginx.org/keys/nginx_signing.key | sudo gpg --dearmor -o /usr/share/keyrings/nginx-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] http://nginx.org/packages/ubuntu `lsb_release -cs` nginx" | sudo tee /etc/apt/sources.list.d/nginx.list
echo "deb-src [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] http://nginx.org/packages/ubuntu `lsb_release -cs` nginx" | sudo tee -a /etc/apt/sources.list.d/nginx.list

sudo apt update
sudo apt install nginx=1.21.0-1~`lsb_release -cs`
